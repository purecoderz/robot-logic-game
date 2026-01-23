// --- 1. CONFIGURATION: The Levels ---
const levels = [
    // --- ID 0 ---
    {
        id: 0,
        name: "1. Free Roam",
        description: "The flag moves randomly! Find it.",
        startX: 0, startY: 0,
        randomGoal: true, 
        walls: [] 
    },

    // --- ID 1 ---
   {
        id: 1,
        name: "2. The Hurdles",
        description: "Jump over the walls. You must come down between them!",
        startX: 0, startY: 0,
        goalX: 8, goalY: 0,
        walls: [
            // 1. The Ground Hurdles (Blocks moving forward on the ground)
            {x: 1, y: 0, side: 'E'}, 
            {x: 3, y: 0, side: 'E'},
            {x: 5, y: 0, side: 'E'}, 
            {x: 7, y: 0, side: 'E'},

            // 2. NEW: The "Air Walls" (Blocks flying across the top)
            // These force the robot to go DOWN at x=2, x=4, and x=6
            {x: 2, y: 1, side: 'E'}, 
            {x: 4, y: 1, side: 'E'},
            {x: 6, y: 1, side: 'E'},

            // 3. The Ceiling (Height Limit)
            {x: 0, y: 1, side: 'N'}, {x: 1, y: 1, side: 'N'},
            {x: 2, y: 1, side: 'N'}, {x: 3, y: 1, side: 'N'},
            {x: 4, y: 1, side: 'N'}, {x: 5, y: 1, side: 'N'},
            {x: 6, y: 1, side: 'N'}, {x: 7, y: 1, side: 'N'},
            {x: 8, y: 1, side: 'N'}, {x: 9, y: 1, side: 'N'}
        ]
    },

    // --- ID 2 ---
    // --- ID 2 ---
    {
        id: 2,
        name: "3. Lucky Hurdles",
        description: "The flag hides in the gaps! You must jump down to check.",
        startX: 0, startY: 0,
        possibleGoals: [
            {x: 2, y: 0}, {x: 4, y: 0}, {x: 6, y: 0}, {x: 8, y: 0}
        ],
        walls: [
            // --- 1. The Ground Hurdles ---
            {x: 1, y: 0, side: 'E'}, 
            {x: 3, y: 0, side: 'E'}, 
            {x: 5, y: 0, side: 'E'}, 
            {x: 7, y: 0, side: 'E'},

            // --- 2. NEW: The Air Walls (Anti-Cheat) ---
            // These block the air path at x=2, x=4, x=6
            // The robot hits these if it tries to stay flying!
            {x: 2, y: 1, side: 'E'}, 
            {x: 4, y: 1, side: 'E'}, 
            {x: 6, y: 1, side: 'E'}, 

            // --- 3. The Ceiling ---
            {x: 0, y: 1, side: 'N'}, {x: 1, y: 1, side: 'N'}, {x: 2, y: 1, side: 'N'},
            {x: 3, y: 1, side: 'N'}, {x: 4, y: 1, side: 'N'}, {x: 5, y: 1, side: 'N'},
            {x: 6, y: 1, side: 'N'}, {x: 7, y: 1, side: 'N'}, {x: 8, y: 1, side: 'N'}
        ]
    },,

    // --- ID 3 ---
    // --- ID 3 ---
    {
        id: 3,
        name: "4. Uneven Hurdles",
        description: "Some walls are higher. You must climb up AND down!",
        startX: 0, startY: 0,
        goalX: 9, goalY: 0,
        walls: [
            // --- 1. The Ground Hurdles ---
            {x: 1, y: 0, side: 'E'}, // Short Wall
            
            {x: 3, y: 0, side: 'E'}, {x: 3, y: 1, side: 'E'}, // Tall Wall
            
            {x: 5, y: 0, side: 'E'}, // Short Wall
            
            {x: 7, y: 0, side: 'E'}, {x: 7, y: 1, side: 'E'}, // Tall Wall

            // --- 2. NEW: The Anti-Cheat Air Walls ---
            
            // GAP x=4: Between Tall Wall (x3) and Short Wall (x5)
            // Robot is at y=2 after crossing x3.
            // We block y=2 so it MUST go down to y=1 to prepare for the short wall.
            {x: 4, y: 2, side: 'E'}, 

            // GAP x=8: After the final Tall Wall (x7)
            // Forces the robot down to the goal at y=0.
            {x: 8, y: 2, side: 'E'},
            {x: 8, y: 1, side: 'E'},

            // --- 3. The Ceilings (Visual & Limit) ---
            {x: 0, y: 1, side: 'N'}, {x: 1, y: 1, side: 'N'}, {x: 2, y: 1, side: 'N'},
            
            {x: 3, y: 2, side: 'N'}, {x: 4, y: 2, side: 'N'}, // Ceiling rises for Tall Wall
            
            {x: 5, y: 1, side: 'N'}, {x: 6, y: 1, side: 'N'}, // Ceiling drops for Short Wall
            
            {x: 7, y: 2, side: 'N'}, {x: 8, y: 2, side: 'N'}  // Ceiling rises again
        ]
    },

    // --- ID 4 ---
    {
        id: 4,
        name: "5. The Staircase",
        description: "Climb the stairs! Use a Loop to repeat steps.",
        startX: 0, startY: 0,
        goalX: 6, goalY: 6,
        walls: [
            {x: 0, y: 0, side: 'N'}, {x: 1, y: 0, side: 'E'},
            {x: 1, y: 1, side: 'N'}, {x: 2, y: 1, side: 'E'},
            {x: 2, y: 2, side: 'N'}, {x: 3, y: 2, side: 'E'},
            {x: 3, y: 3, side: 'N'}, {x: 4, y: 3, side: 'E'},
            {x: 4, y: 4, side: 'N'}, {x: 5, y: 4, side: 'E'},
            {x: 5, y: 5, side: 'N'}
        ]
    },

    // --- ID 5 ---
    {
        id: 5,
        name: "6. The Spiral",
        description: "Follow the path inward. Use functions!",
        startX: 0, startY: 0,
        goalX: 4, goalY: 3,
        walls: [
            {x:0,y:0,side:'N'}, {x:1,y:0,side:'N'}, {x:2,y:0,side:'N'}, {x:3,y:0,side:'N'},
            {x:4,y:0,side:'N'}, {x:5,y:0,side:'N'}, {x:6,y:0,side:'N'}, {x:7,y:0,side:'N'},
            {x:7,y:1,side:'E'}, {x:7,y:2,side:'E'}, {x:7,y:3,side:'E'}, {x:7,y:4,side:'E'},
            {x:7,y:5,side:'E'}, {x:7,y:6,side:'E'}, {x:7,y:7,side:'E'}, 
            {x:1,y:7,side:'N'}, {x:2,y:7,side:'N'}, {x:3,y:7,side:'N'}, 
            {x:4,y:7,side:'N'}, {x:5,y:7,side:'N'}, {x:6,y:7,side:'N'}, 
            {x:1,y:3,side:'E'}, {x:1,y:4,side:'E'}, {x:1,y:5,side:'E'}, {x:1,y:6,side:'E'}, {x:1,y:7,side:'E'},
            {x:2,y:2,side:'N'}, {x:3,y:2,side:'N'}, {x:4,y:2,side:'N'}, {x:5,y:2,side:'N'},
            {x:5,y:3,side:'E'}, {x:5,y:4,side:'E'},
            {x:3,y:4,side:'N'}, {x:4,y:4,side:'N'},
            {x:3,y:4,side:'E'} 
        ]
    }
];

// --- 2. STATE VARIABLES ---
let GAME_SPEED = 500; 
let currentLevel = levels[0]; 
let robotX = 0;
let robotY = 0;
let currentRotation = 0; 
let animationQueue = [];
let isAnimating = false;
let isAutoPlaying = false; // NEW: Tracks if we are "Running" vs "Stepping"
let activeWalls = []; 

// --- 3. INITIALIZATION (On Page Load) ---
window.onload = function() {
    const selector = document.getElementById("mission-select");
    
    // Fill the dropdown menu
    levels.forEach((level, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = level.name;
        selector.appendChild(option);
    });

    // Load the first level immediately
    loadLevel(0);

    // Hook up the Reset Button
    document.getElementById("reset-btn").addEventListener("click", function() {
        isAnimating = false;
        isAutoPlaying = false;
        animationQueue = [];
        
        let highestTimeoutId = setTimeout(";");
        for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }

        resetVisuals();
        const out = document.getElementById("output");
        out.innerHTML = "<div style='color:#e67e22'>Level Reset!</div>";
    });
};

// Called when you pick a new mission from the dropdown
window.loadLevel = function(index) {
    currentLevel = levels[index];
    document.getElementById("mission-desc").innerText = currentLevel.description;
    resetVisuals();
};

function resetVisuals() {
    // --- 1. DETERMINE GOAL LOCATION ---
    if (currentLevel.possibleGoals && currentLevel.possibleGoals.length > 0) {
        const randSpot = currentLevel.possibleGoals[Math.floor(Math.random() * currentLevel.possibleGoals.length)];
        currentLevel.currentGoalX = randSpot.x;
        currentLevel.currentGoalY = randSpot.y;
    } 
    else if (currentLevel.randomGoal) {
        currentLevel.currentGoalX = Math.floor(Math.random() * 9);
        currentLevel.currentGoalY = Math.floor(Math.random() * 9);
    } else {
        currentLevel.currentGoalX = currentLevel.goalX;
        currentLevel.currentGoalY = currentLevel.goalY;
    }

    // --- 2. RESET STATE ---
    animationQueue = [];
    isAnimating = false;
    isAutoPlaying = false;

    // --- 3. RESET ROBOT ---
    robotX = currentLevel.startX * 40;
    robotY = currentLevel.startY * 40;
    currentRotation = 0;
    
    const robot = document.getElementById("robot");
    robot.style.left = robotX + "px";
    robot.style.bottom = robotY + "px";
    if (typeof updateSprite === "function") updateSprite(); 

    // --- 4. DRAW GOAL ---
    const goal = document.getElementById("goal");
    goal.style.display = "block";
    goal.style.left = (currentLevel.currentGoalX * 40) + "px";
    goal.style.bottom = (currentLevel.currentGoalY * 40) + "px";

    // --- 5. DRAW WALLS (Hurdles) ---
    const container = document.getElementById("world-container");
    document.querySelectorAll('.wall').forEach(e => e.remove());
    
    activeWalls = currentLevel.walls || []; 
    
    activeWalls.forEach(w => {
        const wallDiv = document.createElement("div");
        wallDiv.classList.add("wall");
        
        if (w.side === 'E') {
            wallDiv.classList.add("wall-vertical");
            wallDiv.style.left = ((w.x + 1) * 40) + "px"; 
            wallDiv.style.bottom = (w.y * 40) + "px";
        } 
        else if (w.side === 'N') {
            wallDiv.classList.add("wall-horizontal");
            wallDiv.style.left = (w.x * 40) + "px";
            wallDiv.style.bottom = ((w.y + 1) * 40) - 3 + "px"; 
        }
        
        container.appendChild(wallDiv);
    });

    // --- 6. LOGS ---
    const out = document.getElementById("output");
    if(out) out.innerHTML = "<div style='color:#888'>Ready: " + currentLevel.name + "</div>";
}

// --- 4. WASM LOADER ---
const go = new Go();
WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject).then((result) => {
    go.run(result.instance);

    const runBtn = document.querySelector(".run-btn"); // Assuming class 'run-btn'
    if(runBtn) {
        runBtn.disabled = false;
        runBtn.innerText = "▶ Run Code";
        runBtn.style.cursor = "pointer";
    }
    console.log("Wasm loaded and ready!");
});

// --- 5. SIMULATION ENGINE ---

// Modified to handle both Step and Run modes
window.addToAnimationQueue = (action) => {
    animationQueue.push(action);
    // Only auto-play if the Run button was clicked
    if (isAutoPlaying && !isAnimating) {
        processQueue();
    }
};

// "Run Code" Button
window.runSimulation = function() {
    isAutoPlaying = true; // Enable auto-loop
    startCodeExecution();
}

// "Step" Button
window.stepSimulation = async function() {
    // 1. If queue is empty, compile the code first
    if (animationQueue.length === 0) {
        console.log("Compiling code for Step Mode...");
        isAutoPlaying = false; // Disable auto-loop
        startCodeExecution();
        
        // Wait briefly for Go to populate the queue
        await new Promise(r => setTimeout(r, 100));
    }

    // 2. Execute just ONE move
    if (animationQueue.length > 0) {
        const action = animationQueue.shift();
        performAction(action);
    } else {
        console.log("No more steps.");
    }
}

// Shared helper to compile and start
function startCodeExecution() {
    // Soft Reset (Robot returns to start)
    robotX = currentLevel.startX * 40;
    robotY = currentLevel.startY * 40;
    currentRotation = 0;
    
    const el = document.getElementById("robot");
    el.style.left = robotX + "px";
    el.style.bottom = robotY + "px";
    updateSprite();
    
    document.getElementById("output").innerHTML = "<div style='color:#888'>Executing...</div>";

    let code = document.getElementById("editor").value;
    let result = window.runGoCode(code);
    
    if (result && result.startsWith("Code Error")) {
        log(result, "error");
    }
}

// NEW: Core logic for a single move (Used by both Run and Step)
async function performAction(action) {
    const el = document.getElementById("robot");

    if (action === "move" || action === "moveForward") {
        const heading = currentRotation % 360;
        let nextX = robotX;
        let nextY = robotY;

        // Calculate next position
        if (heading === 0) nextX += 40;
        else if (heading === 90) nextY += 40;
        else if (heading === 180) nextX -= 40;
        else if (heading === 270) nextY -= 40;

        // --- CRASH CHECK ---
        if (checkCollision(nextX, nextY, heading)) {
            log("💥 CRASH! Hit a wall!", "error");
            el.style.transform = "scale(0.8)";
            setTimeout(() => el.style.transform = "scale(1)", 200);
            
            animationQueue = []; 
            isAnimating = false;
            
            setTimeout(() => {
                showGameOver("💥 CRASH!", "You hit a wall!");
            }, 500);
            return false; // Stop
        }

        // Move Valid
        robotX = nextX;
        robotY = nextY;
        el.style.left = robotX + "px";
        el.style.bottom = robotY + "px";

        // --- INSTANT WIN CHECK ---
        const gX = Math.round(robotX / 40);
        const gY = Math.round(robotY / 40);
        
        if (gX === currentLevel.currentGoalX && gY === currentLevel.currentGoalY) {
            log("🏆 SUCCESS! You found the flag!", "success");
            animationQueue = [];
            isAnimating = false;
            setTimeout(() => {
                showSuccessModal(); 
            }, 500);
            return false; // Stop (Win)
        }
        
    } else if (action === "turnLeft") {
        currentRotation += 90;
        // Normalize rotation 0-360
        if (currentRotation >= 360) currentRotation -= 360;
        updateSprite();

    } else if (action === "turnRight") {
        currentRotation -= 90;
        if (currentRotation < 0) currentRotation += 360;
        updateSprite();
    }

    return true; // Keep going
}

// The Automatic Loop (Only used when Run is clicked)
async function processQueue() {
    if (animationQueue.length === 0) {
        if (!isAnimating) return;
        isAnimating = false;
        
        // Final Win/Loss Check for Run Mode
        const gX = Math.round(robotX / 40);
        const gY = Math.round(robotY / 40);
        if (gX === currentLevel.currentGoalX && gY === currentLevel.currentGoalY) {
             // Already handled in performAction, but safety check
        } else {
            log("❌ Game Over: Robot stopped!", "error");
            setTimeout(() => {
                showGameOver("🛑 OUT OF POWER", "You stopped before reaching the flag.");
            }, 500);
        }
        return;
    }

    isAnimating = true;
    const action = animationQueue.shift(); // Get next move

    // Run Logic
    const keepGoing = await performAction(action);

    // Recurse
    if (keepGoing) {
        console.log("Waiting " + GAME_SPEED + "ms...");
        await new Promise(r => setTimeout(r, GAME_SPEED)); 
        processQueue(); 
    }
}

function checkCollision(targetX, targetY, direction) {
    const currentGridX = Math.round(robotX / 40);
    const currentGridY = Math.round(robotY / 40);
    
    // 1. Map Boundaries
    if (targetX < 0 || targetX > 360 || targetY < 0 || targetY > 360) return true;

    // 2. Obstacles
    for (let w of activeWalls) {
        // East/Vertical Walls
        if (direction === 0 && w.side === 'E' && w.x === currentGridX && w.y === currentGridY) return true;
        if (direction === 180 && w.side === 'E' && w.x === (currentGridX - 1) && w.y === currentGridY) return true;

        // North/Horizontal Walls
        if (direction === 90 && w.side === 'N' && w.x === currentGridX && w.y === currentGridY) return true;
        if (direction === 270 && w.side === 'N' && w.x === currentGridX && w.y === (currentGridY - 1)) return true;
    }
    return false;
}

function updateSprite() {
    const el = document.getElementById("robot");
    el.className = ""; 
    const heading = currentRotation % 360;
    if (heading === 0) el.classList.add("facing-east");
    else if (heading === 90) el.classList.add("facing-north");
    else if (heading === 180) el.classList.add("facing-west");
    else if (heading === 270) el.classList.add("facing-south");
}

function log(msg, type="info") {
    const out = document.getElementById("output");
    const div = document.createElement("div");
    div.className = "log-entry";
    if(type==="error") div.style.color = "#e74c3c";
    if(type==="success") div.style.color = "#2ecc71";
    div.innerText = "> " + msg;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
}

// --- MODAL FUNCTIONS ---

function showGameOver(title, reason) {
    const modal = document.getElementById("game-over-modal");
    document.getElementById("game-over-title").innerText = title;
    document.getElementById("game-over-reason").innerText = reason;
    modal.classList.remove("hidden");
}

window.closeModalAndReset = function() {
    document.getElementById("game-over-modal").classList.add("hidden");
    resetVisuals();
    log("Robot repaired and reset.", "info");
}

function showSuccessModal() {
    document.getElementById("success-modal").classList.remove("hidden");
}

window.closeSuccessModal = function() {
    document.getElementById("success-modal").classList.add("hidden");
}

window.showInstructions = function() {
    document.getElementById("instructions-modal").classList.remove("hidden");
}

window.closeInstructions = function() {
    document.getElementById("instructions-modal").classList.add("hidden");
}