//go:build js && wasm

package main

import (
	"encoding/json"
	"fmt"
	"reflect"
	"syscall/js"

	"github.com/traefik/yaegi/interp"
	"github.com/traefik/yaegi/stdlib"
)

// --- 1. CONSTANTS & STATE ---

const (
	DirEast  = 0
	DirNorth = 1
	DirWest  = 2
	DirSouth = 3
)

// Global State (Tracks the robot's "Virtual" position during simulation)
var (
	robotX   int
	robotY   int
	robotDir int // 0=E, 1=N, 2=W, 3=S

	goalX int
	goalY int

	levelWalls []Wall
)

type Wall struct {
	X    int    `json:"x"`
	Y    int    `json:"y"`
	Side string `json:"side"` // "N", "E", "S", "W"
}

// --- 2. HELPER FUNCTIONS (COLLISION LOGIC) ---

// Checks if a specific wall object exists in the level data
func hasWall(x, y int, side string) bool {
	for _, w := range levelWalls {
		if w.X == x && w.Y == y && w.Side == side {
			return true
		}
	}
	return false
}

// Core logic: Is the path blocked from (x,y) facing (dir)?
func isBlocked(x, y, dir int) bool {
	// 1. Check World Boundaries (The 10x10 Grid Edges)
	// If the robot tries to walk off the map, it is blocked.
	if dir == DirEast && x >= 9 {
		return true
	}
	if dir == DirWest && x <= 0 {
		return true
	}
	if dir == DirNorth && y >= 9 {
		return true
	}
	if dir == DirSouth && y <= 0 {
		return true
	}

	// 2. Check Inner Walls (Obstacles)
	switch dir {
	case DirEast:
		// Blocked if: Wall on East of current tile OR Wall on West of next tile
		return hasWall(x, y, "E") || hasWall(x+1, y, "W")
	case DirNorth:
		return hasWall(x, y, "N") || hasWall(x, y+1, "S")
	case DirWest:
		return hasWall(x, y, "W") || hasWall(x-1, y, "E")
	case DirSouth:
		return hasWall(x, y, "S") || hasWall(x, y-1, "N")
	}
	return false
}

// --- 3. ACTIONS (COMMANDS) ---

func TurnLeft() {
	// Update Virtual Direction
	robotDir++
	if robotDir > 3 {
		robotDir = 0
	}

	// Send visual command to JS
	js.Global().Call("addToAnimationQueue", "turnLeft")
}

func Move() {
	// 1. Check for collision BEFORE moving
	if isBlocked(robotX, robotY, robotDir) {
		fmt.Println("💥 CRASH! Robot hit a wall.")
		// We do NOT update X/Y, but we send 'move' so the frontend can show a crash visual
		js.Global().Call("addToAnimationQueue", "move")
		return
	}

	// 2. Update Virtual Position
	switch robotDir {
	case DirEast:
		robotX++
	case DirNorth:
		robotY++
	case DirWest:
		robotX--
	case DirSouth:
		robotY--
	}

	// 3. Send visual command to JS
	js.Global().Call("addToAnimationQueue", "move")
}

// --- 4. SENSORS (BOOLEAN CHECKS) ---

// Checks wall relative to where the robot is facing
func WallInFront() bool {
	return isBlocked(robotX, robotY, robotDir)
}

// Checks wall to the right (Dir - 1)
func WallByRight() bool {
	checkDir := robotDir - 1
	if checkDir < 0 {
		checkDir = 3 // Wrap around: East(0) -> South(3)
	}
	return isBlocked(robotX, robotY, checkDir)
}

// Checks wall to the left (Dir + 1)
func WallByLeft() bool {
	checkDir := robotDir + 1
	if checkDir > 3 {
		checkDir = 0 // Wrap around: South(3) -> East(0)
	}
	return isBlocked(robotX, robotY, checkDir)
}

// Checks if robot is standing on the goal
func AtGoal() bool {
	return robotX == goalX && robotY == goalY
}

// --- 5. COMPILER BRIDGE ---

// Expected Args from JavaScript:
// 0: Student Code (string)
// 1: Walls JSON (string)
// 2: Goal X (int)
// 3: Goal Y (int)
// 4: Start X (int)
// 5: Start Y (int)
// 6: Start Dir (int)
func RunStudentCode(this js.Value, args []js.Value) interface{} {
	if len(args) > 6 && !args[4].IsUndefined() && !args[5].IsUndefined() {
		robotX = args[4].Int()
		robotY = args[5].Int()

		if !args[6].IsUndefined() {
			robotDir = args[6].Int()
		} else {
			robotDir = 0
		}
	} else {
		// Fallback if JS sends garbage or nothing
		fmt.Println("⚠️ Warning: specific start position not found, defaulting to 0,0")
		robotX, robotY, robotDir = 0, 0, 0
	}
	// A. Parse Inputs
	studentCode := args[0].String()
	wallsJSON := args[1].String()

	if len(args) > 3 {
		goalX = args[2].Int()
		goalY = args[3].Int()
	}

	// B. Initialize Robot Position
	// CRITICAL: We must start the simulation where the robot actually is!
	if len(args) > 6 {
		robotX = args[4].Int()
		robotY = args[5].Int()
		robotDir = args[6].Int()
	} else {
		// Fallback if JS forgets to send start pos
		robotX, robotY, robotDir = 0, 0, 0
	}

	// C. Load Walls
	levelWalls = []Wall{}
	json.Unmarshal([]byte(wallsJSON), &levelWalls)

	// D. Setup Yaegi Interpreter
	i := interp.New(interp.Options{})
	i.Use(stdlib.Symbols)

	// Inject logic-based commands
	i.Use(interp.Exports{
		"reeborg/index": {
			// Actions
			"move":     reflect.ValueOf(Move),
			"turnLeft": reflect.ValueOf(TurnLeft),

			// Sensors
			"wallInFront": reflect.ValueOf(WallInFront),
			"wallByRight": reflect.ValueOf(WallByRight),
			"wallByLeft":  reflect.ValueOf(WallByLeft),
			"atGoal":      reflect.ValueOf(AtGoal),
		},
	})

	// Make functions global (so user doesn't type reeborg.move())
	_, err := i.Eval(`import . "reeborg"`)
	if err != nil {
		return "System Error: " + err.Error()
	}

	// E. Run User Code
	_, err = i.Eval(studentCode)
	if err != nil {
		return "Code Error: " + err.Error()
	}

	return "Simulation Finished"
}

func main() {
	// Expose the Go function to JavaScript
	js.Global().Set("runGoCode", js.FuncOf(RunStudentCode))

	// Keep the Wasm module running indefinitely
	select {}
}
