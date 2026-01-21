//go:build js && wasm

package main

import (
	"fmt"
	"reflect"
	"syscall/js"

	"github.com/traefik/yaegi/interp"
	"github.com/traefik/yaegi/stdlib"
)

// --- 1. THE COMMANDS (Hidden from Student) ---
// These send signals to the JavaScript frontend

func Move() {
	js.Global().Call("addToAnimationQueue", "move")
	fmt.Println("🤖 Robot moved forward")
}

func TurnLeft() {
	js.Global().Call("addToAnimationQueue", "turnLeft")
	fmt.Println("🔄 Robot turned left")
}

// --- 2. THE COMPILER BRIDGE ---

func RunStudentCode(this js.Value, args []js.Value) interface{} {
	studentCode := args[0].String()

	// Initialize Interpreter
	i := interp.New(interp.Options{})
	i.Use(stdlib.Symbols)

	// Inject our commands so the student can use them
	i.Use(interp.Exports{
		"reeborg/index": {
			"Move":     reflect.ValueOf(Move),
			"TurnLeft": reflect.ValueOf(TurnLeft),
		},
	})

	// Import the package automatically
	_, err := i.Eval(`import . "reeborg"`)
	if err != nil {
		return "System Error: " + err.Error()
	}

	// Run the student's code
	_, err = i.Eval(studentCode)
	if err != nil {
		return "Code Error: " + err.Error()
	}

	return "Simulation Finished"
}

func main() {
	// Register the function so JS can call it
	js.Global().Set("runGoCode", js.FuncOf(RunStudentCode))

	// Keep Wasm alive
	select {}
}
