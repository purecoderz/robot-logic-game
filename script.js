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
        description: "Jump over the walls. Don't go too high!",
        startX: 0, startY: 0,
        goalX: 8, goalY: 0,
        walls: [
            // Vertical Hurdles
            {x: 1, y: 0, side: 'E'}, {x: 3, y: 0, side: 'E'},
            {x: 5, y: 0, side: 'E'}, {x: 7, y: 0, side: 'E'},
            // Ceiling (Height Limit)
            {x: 0, y: 1, side: 'N'}, {x: 1, y: 1, side: 'N'},
            {x: 2, y: 1, side: 'N'}, {x: 3, y: 1, side: 'N'},
            {x: 4, y: 1, side: 'N'}, {x: 5, y: 1, side: 'N'},
            {x: 6, y: 1, side: 'N'}, {x: 7, y: 1, side: 'N'},
            {x: 8, y: 1, side: 'N'}, {x: 9, y: 1, side: 'N'}
        ]
    },

    // --- ID 2 ---
    {
        id: 2,
        name: "3. Lucky Hurdles",
        description: "The flag hides in the gaps! Jump and check.",
        startX: 0, startY: 0,
        // The goal only appears in the empty spaces between walls
        possibleGoals: [
            {x: 2, y: 0}, {x: 4, y: 0}, {x: 6, y: 0}, {x: 8, y: 0}
        ],
        walls: [
            // Hurdle 1
            {x: 1, y: 0, side: 'E'}, 
            {x: 0, y: 1, side: 'N'}, {x: 1, y: 1, side: 'N'}, {x: 2, y: 1, side: 'N'},
            // Hurdle 2
            {x: 3, y: 0, side: 'E'}, 
            {x: 2, y: 1, side: 'N'}, {x: 3, y: 1, side: 'N'}, {x: 4, y: 1, side: 'N'},
            // Hurdle 3
            {x: 5, y: 0, side: 'E'}, 
            {x: 4, y: 1, side: 'N'}, {x: 5, y: 1, side: 'N'}, {x: 6, y: 1, side: 'N'},
            // Hurdle 4
            {x: 7, y: 0, side: 'E'}, 
            {x: 6, y: 1, side: 'N'}, {x: 7, y: 1, side: 'N'}, {x: 8, y: 1, side: 'N'}
        ]
    },

    // --- ID 3 ---
    {
        id: 3,
        name: "4. Uneven Hurdles",
        description: "Watch out! Some walls are higher than others.",
        startX: 0, startY: 0,
        goalX: 9, goalY: 0,
        walls: [
            // HURDLE 1: LOW (Height 1)
            {x: 1, y: 0, side: 'E'}, 
            {x: 0, y: 1, side: 'N'}, {x: 1, y: 1, side: 'N'}, {x: 2, y: 1, side: 'N'},

            // HURDLE 2: HIGH (Height 2)
            {x: 3, y: 0, side: 'E'}, {x: 3, y: 1, side: 'E'},
            {x: 3, y: 2, side: 'N'}, {x: 4, y: 2, side: 'N'},

            // HURDLE 3: LOW (Height 1)
            {x: 5, y: 0, side: 'E'},
            {x: 5, y: 1, side: 'N'}, {x: 6, y: 1, side: 'N'},

            // HURDLE 4: HIGH (Height 2)
            {x: 7, y: 0, side: 'E'}, {x: 7, y: 1, side: 'E'},
            {x: 7, y: 2, side: 'N'}, {x: 8, y: 2, side: 'N'}
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
            // STEP 1
            {x: 0, y: 0, side: 'N'}, {x: 1, y: 0, side: 'E'},
            // STEP 2
            {x: 1, y: 1, side: 'N'}, {x: 2, y: 1, side: 'E'},
            // STEP 3
            {x: 2, y: 2, side: 'N'}, {x: 3, y: 2, side: 'E'},
            // STEP 4
            {x: 3, y: 3, side: 'N'}, {x: 4, y: 3, side: 'E'},
            // STEP 5
            {x: 4, y: 4, side: 'N'}, {x: 5, y: 4, side: 'E'},
            // STEP 6
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
            // 1. First Hallway (Bottom)
            {x:0,y:0,side:'N'}, {x:1,y:0,side:'N'}, {x:2,y:0,side:'N'}, {x:3,y:0,side:'N'},
            {x:4,y:0,side:'N'}, {x:5,y:0,side:'N'}, {x:6,y:0,side:'N'}, {x:7,y:0,side:'N'},

            // 2. Second Hallway (Right)
            {x:7,y:1,side:'E'}, {x:7,y:2,side:'E'}, {x:7,y:3,side:'E'}, {x:7,y:4,side:'E'},
            {x:7,y:5,side:'E'}, {x:7,y:6,side:'E'}, {x:7,y:7,side:'E'}, 

            // 3. Third Hallway (Top)
            {x:1,y:7,side:'N'}, {x:2,y:7,side:'N'}, {x:3,y:7,side:'N'}, 
            {x:4,y:7,side:'N'}, {x:5,y:7,side:'N'}, {x:6,y:7,side:'N'}, 

            // 4. Fourth Hallway (Left)
            {x:1,y:3,side:'E'}, {x:1,y:4,side:'E'}, {x:1,y:5,side:'E'}, {x:1,y:6,side:'E'}, {x:1,y:7,side:'E'},
            
            // 5. Inner Bottom
            {x:2,y:2,side:'N'}, {x:3,y:2,side:'N'}, {x:4,y:2,side:'N'}, {x:5,y:2,side:'N'},

            // 6. Inner Right
            {x:5,y:3,side:'E'}, {x:5,y:4,side:'E'},

            // 7. Inner Top
            {x:3,y:4,side:'N'}, {x:4,y:4,side:'N'},
            
            // 8. Final Stretch
            {x:3,y:4,side:'E'} 
        ]
    }
];

// --- 2. STATE VARIABLES ---
let currentLevel = levels[0]; 
let robotX = 0;
let robotY = 0;
let currentRotation = 0; // 0=East, 90=North, 180=West...
let animationQueue = [];
let isAnimating = false;
let activeWalls = []; // Stores current level's walls

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
    // 1. Stop any currently running animation
    isAnimating = false;
    animationQueue = [];
    
    // 2. Clear any pending timeouts (stops the loop)
    // (This is a safety measure if you used setTimeout recursively)
    let highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }

    // 3. Re-draw the level (Robot to start, New Random Flag)
    resetVisuals();
    
    // 4. Update the log
    const out = document.getElementById("output");
    out.innerHTML = "<div style='color:#e67e22'>Level Reset!</div>";
});
};

// Called when you pick a new mission from the dropdown
window.loadLevel = function(index) {
    currentLevel = levels[index];
    
    // Update Text
    document.getElementById("mission-desc").innerText = currentLevel.description;
    
    resetVisuals();
};

function resetVisuals() {
    // --- 1. DETERMINE GOAL LOCATION ---
    // We calculate this FIRST. 
    
    if (currentLevel.possibleGoals && currentLevel.possibleGoals.length > 0) {
        // SCENARIO A: Pick from the list (Level 6: Lucky Search)
        // This picks a random object like {x:2, y:0}
        const randSpot = currentLevel.possibleGoals[Math.floor(Math.random() * currentLevel.possibleGoals.length)];
        currentLevel.currentGoalX = randSpot.x;
        currentLevel.currentGoalY = randSpot.y;
    } 
    else if (currentLevel.randomGoal) {
        // SCENARIO B: Completely random (Level 1)
        currentLevel.currentGoalX = Math.floor(Math.random() * 9);
        currentLevel.currentGoalY = Math.floor(Math.random() * 9);
    } else {
        // SCENARIO C: Fixed Goal (Levels 2, 3, 4, 5)
        currentLevel.currentGoalX = currentLevel.goalX;
        currentLevel.currentGoalY = currentLevel.goalY;
    }

    // --- 2. RESET STATE ---
    animationQueue = [];
    isAnimating = false;

    // --- 3. RESET ROBOT ---
    robotX = currentLevel.startX * 40;
    robotY = currentLevel.startY * 40;
    currentRotation = 0;
    
    const robot = document.getElementById("robot");
    robot.style.left = robotX + "px";
    robot.style.bottom = robotY + "px";
    if (typeof updateSprite === "function") updateSprite(); 

    // --- 4. DRAW GOAL ---
    // KEY FIX: We use the coordinates calculated in Step 1.
    // We do NOT recalculate them here.
    const goal = document.getElementById("goal");
    goal.style.display = "block";
    goal.style.left = (currentLevel.currentGoalX * 40) + "px";
    goal.style.bottom = (currentLevel.currentGoalY * 40) + "px";

    // --- 5. DRAW WALLS (Hurdles) ---
    const container = document.getElementById("world-container");
    // Remove old walls
    document.querySelectorAll('.wall').forEach(e => e.remove());
    
    const activeWalls = currentLevel.walls || [];
    
    activeWalls.forEach(w => {
        const wallDiv = document.createElement("div");
        wallDiv.classList.add("wall");
        
        if (w.side === 'E') {
            // Vertical Wall
            wallDiv.classList.add("wall-vertical");
            wallDiv.style.left = ((w.x + 1) * 40) + "px"; 
            wallDiv.style.bottom = (w.y * 40) + "px";
        } 
        else if (w.side === 'N') {
            // Horizontal Wall (Ceiling)
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
// --- 4. WASM LOADER ---
const go = new Go();

WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject).then((result) => {
    // 1. Start the Go program
    go.run(result.instance);

    // 2. Enable the Run Button
    const runBtn = document.getElementById("run-btn");
    runBtn.disabled = false;
    runBtn.innerText = "▶ Run Code";
    // runBtn.style.backgroundColor = "#2ecc71"; // Optional: Make it green to show it's ready
    runBtn.style.cursor = "pointer";

    console.log("Wasm loaded and ready!");
});

// --- 5. SIMULATION ENGINE ---
window.addToAnimationQueue = (action) => {
    animationQueue.push(action);
    processQueue();
};

window.runSimulation = function() {
    // Soft Reset (Keep goal and walls, just reset robot)
    animationQueue = [];
    isAnimating = false;
    
    robotX = currentLevel.startX * 40;
    robotY = currentLevel.startY * 40;
    currentRotation = 0;
    
    const el = document.getElementById("robot");
    el.style.left = robotX + "px";
    el.style.bottom = robotY + "px";
    updateSprite();
    
    document.getElementById("output").innerHTML = "<div style='color:#888'>Running...</div>";

    let code = document.getElementById("editor").value;
    let result = window.runGoCode(code);
    
    if (result && result.startsWith("Code Error")) {
        log(result, "error");
    }
}

// Check if moving from current square hits a wall
function checkCollision(targetX, targetY, direction) {
    const currentGridX = Math.round(robotX / 40);
    const currentGridY = Math.round(robotY / 40);
    
    // 1. Map Boundaries
    if (targetX < 0 || targetX > 360 || targetY < 0 || targetY > 360) return true;

    // 2. Obstacles
    for (let w of activeWalls) {
        
        // --- CHECK EAST WALLS (Vertical) ---
        // If facing East (0), check wall on my Right
        if (direction === 0 && w.side === 'E' && w.x === currentGridX && w.y === currentGridY) return true;
        // If facing West (180), check wall on neighbor's Right
        if (direction === 180 && w.side === 'E' && w.x === (currentGridX - 1) && w.y === currentGridY) return true;

        // --- CHECK NORTH WALLS (Horizontal/Ceiling) ---
        // If facing North (90), check wall on my Top
        if (direction === 90 && w.side === 'N' && w.x === currentGridX && w.y === currentGridY) return true;
        // If facing South (270), check wall on neighbor's Top (the cell below me)
        if (direction === 270 && w.side === 'N' && w.x === currentGridX && w.y === (currentGridY - 1)) return true;
    }
    return false;
}

async function processQueue() {
    // 1. CHECK IF QUEUE IS EMPTY (Animation Finished)
    if (animationQueue.length === 0) {
        if (!isAnimating) return; 
        isAnimating = false;

        const gridX = Math.round(robotX / 40);
        const gridY = Math.round(robotY / 40);

        // CHECK: Is the robot at the goal?
        if (gridX === currentLevel.currentGoalX && gridY === currentLevel.currentGoalY) {
            // --- VICTORY ---
            log("🏆 SUCCESS! Goal Reached!", "success");
            const el = document.getElementById("robot");
            el.style.transform = "scale(1.2)";
            setTimeout(() => el.style.transform = "scale(1)", 200);
        } else {
            // --- FAILURE: RAN OUT OF MOVES ---
            log("❌ Game Over: Robot stopped!", "error");
            
            // Wait 500ms then show the "Stopped" Modal
            setTimeout(() => {
                showGameOver("🛑 OUT OF POWER", "You stopped before reaching the flag. Check your loops!");
            }, 500);
        }
        return;
    }

    isAnimating = true;
    const action = animationQueue.shift();
    const el = document.getElementById("robot");

    // 2. HANDLE MOVEMENT
    if (action === "move") {
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
             
             // Visual Bump
             el.style.transform = "scale(0.8)";
             setTimeout(() => el.style.transform = "scale(1)", 200);
             
             // Stop everything
             animationQueue = []; 
             isAnimating = false;
             
             // Wait 500ms then show the "Crash" Modal
             setTimeout(() => {
                 showGameOver("💥 CRASH!", "You hit a wall! The robot has been damaged.");
             }, 500);
             
             return; // Exit function immediately
         } else {
             // Move is Valid
             robotX = nextX;
             robotY = nextY;
             el.style.left = robotX + "px";
             el.style.bottom = robotY + "px";

             // --- INSTANT WIN CHECK ---
             // (If robot steps on flag while moving, win immediately)
             const gX = Math.round(robotX / 40);
             const gY = Math.round(robotY / 40);
             
             if (gX === currentLevel.currentGoalX && gY === currentLevel.currentGoalY) {
                 log("🏆 SUCCESS! You found the flag!", "success");
                 animationQueue = []; // Stop remaining moves
                 isAnimating = false;
                 return;
             }
         }
         
    } else if (action === "turnLeft") {
         currentRotation += 90;
         updateSprite();
    }

    // 3. RECURSIVE LOOP (Run next step)
    await new Promise(r => setTimeout(r, 300)); 
    processQueue(); 
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

function showGameOver(title, reason) {
    const modal = document.getElementById("game-over-modal");
    
    // Update the Title (e.g., "CRASH!" or "STOPPED")
    const titleEl = document.getElementById("game-over-title");
    if(titleEl) titleEl.innerText = title;

    // Update the Reason
    const reasonEl = document.getElementById("game-over-reason");
    if(reasonEl) reasonEl.innerText = reason;
    
    modal.classList.remove("hidden");
}

window.closeModalAndReset = function() {
    const modal = document.getElementById("game-over-modal");
    modal.classList.add("hidden");
    
    // Reset the robot position immediately
    resetVisuals();
    log("Robot repaired and reset.", "info");
}