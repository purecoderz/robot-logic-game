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

// Helper to check if a specific wall exists in the level data
func hasWall(x, y int, side string) bool {
	for _, w := range levelWalls {
		if w.X == x && w.Y == y && w.Side == side {
			return true
		}
	}
	return false
}

// --- 2. ACTIONS (Commands) ---

func TurnLeft() {
	robotDir++
	if robotDir > 3 {
		robotDir = 0
	}

	js.Global().Call("addToAnimationQueue", "turnLeft")
	// fmt.Printf("🔄 Turned Left. Now facing: %d\n", robotDir)
}

func Move() {
	// 1. Calculate new position based on direction
	nextX, nextY := robotX, robotY

	switch robotDir {
	case DirEast:
		nextX++
	case DirNorth:
		nextY++
	case DirWest:
		nextX--
	case DirSouth:
		nextY--
	}

	// 2. Check for collision BEFORE moving (Virtual Collision)
	if isBlocked(robotX, robotY, robotDir) {
		fmt.Println("💥 CRASH! Robot hit a wall.")
		// We do NOT update X/Y, but we still send the move animation
		// so the frontend can show a crash animation if you have one.
		js.Global().Call("addToAnimationQueue", "move")
		return
	}

	// 3. Update State
	robotX = nextX
	robotY = nextY

	js.Global().Call("addToAnimationQueue", "move")
	// fmt.Printf("🤖 Moved to (%d, %d)\n", robotX, robotY)
}

// --- 3. SENSORS (Boolean Checks) ---

// Checks wall relative to where the robot is facing
func WallInFront() bool {
	return isBlocked(robotX, robotY, robotDir)
}

// Checks wall to the right (Dir - 1)
func WallByRight() bool {
	checkDir := robotDir - 1
	if checkDir < 0 {
		checkDir = 3
	}
	return isBlocked(robotX, robotY, checkDir)
}

// Checks wall to the left (Dir + 1)
func WallByLeft() bool {
	checkDir := robotDir + 1
	if checkDir > 3 {
		checkDir = 0
	}
	return isBlocked(robotX, robotY, checkDir)
}

func AtGoal() bool {
	return robotX == goalX && robotY == goalY
}

// Core logic to check if a specific direction is blocked from current x,y
func isBlocked(x, y, dir int) bool {
	switch dir {
	case DirEast:
		// Check for East wall at current tile OR West wall at next tile
		return hasWall(x, y, "E") || hasWall(x+1, y, "W")
	case DirNorth:
		// Check for North wall at current tile OR South wall at next tile
		return hasWall(x, y, "N") || hasWall(x, y+1, "S")
	case DirWest:
		// Check for West wall at current tile OR East wall at previous tile
		return hasWall(x, y, "W") || hasWall(x-1, y, "E")
	case DirSouth:
		// Check for South wall at current tile OR North wall at previous tile
		return hasWall(x, y, "S") || hasWall(x, y-1, "N")
	}
	return false
}

// --- 4. COMPILER BRIDGE ---

// Expected Args:
// 0: Student Code (string)
// 1: Level Walls (JSON string)
// 2: Goal X (int)
// 3: Goal Y (int)
// 4: Start Dir (int) [Optional, default 0]
func RunStudentCode(this js.Value, args []js.Value) interface{} {
	studentCode := args[0].String()
	wallsJSON := args[1].String()

	// Reset State
	robotX = 0         // Or pass startX
	robotY = 0         // Or pass startY
	robotDir = DirEast // Default East

	if len(args) > 2 {
		goalX = args[2].Int()
		goalY = args[3].Int()
	}

	// Parse Walls
	levelWalls = []Wall{}
	json.Unmarshal([]byte(wallsJSON), &levelWalls)

	// Setup Interpreter
	i := interp.New(interp.Options{})
	i.Use(stdlib.Symbols)

	// Inject logic-based commands
	i.Use(interp.Exports{
		"reeborg/index": {
			// Actions
			"move":     reflect.ValueOf(Move),
			"turnLeft": reflect.ValueOf(TurnLeft),

			// Sensors (Boolean returns)
			"wallInFront": reflect.ValueOf(WallInFront),
			"wallByRight": reflect.ValueOf(WallByRight),
			"wallByLeft":  reflect.ValueOf(WallByLeft),
			"atGoal":      reflect.ValueOf(AtGoal),
		},
	})

	_, err := i.Eval(`import . "reeborg"`)
	if err != nil {
		return "System Error: " + err.Error()
	}

	// Run Code
	_, err = i.Eval(studentCode)
	if err != nil {
		return "Code Error: " + err.Error()
	}

	return "Simulation Finished"
}

func main() {
	js.Global().Set("runGoCode", js.FuncOf(RunStudentCode))
	select {}
}
