
// --- 2. STATE VARIABLES ---
let GAME_SPEED = 500; 
let currentLevel = levels[0]; 
let robotX = 0;
let robotY = 0;
let currentRotation = 0; 
let animationQueue = [];
let isAnimating = false;
let isAutoPlaying = false; 
let activeWalls = []; 

// --- 3. INITIALIZATION & RESET LOGIC ---
window.onload = function() {
    const selector = document.getElementById("mission-select");

    const editor = document.getElementById("editor");
    
    editor.addEventListener("keydown", function(e) {
        // Check if the key pressed is 'Tab'
        if (e.key === "Tab") {
            e.preventDefault(); // STOP the focus from moving to the next button

            // Get the current cursor position
            const start = this.selectionStart;
            const end = this.selectionEnd;

            // set textarea value to: text before cursor + tab + text after cursor
            this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

            // Move the cursor to right after the inserted tab
            this.selectionStart = this.selectionEnd = start + 1;
        }
    });
    
    // Populate Mission Select
    levels.forEach((level, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = level.name;
        selector.appendChild(option);
    });

    // Load Default Level
    loadLevel(0);

    // --- NEW: SPEED SLIDER LOGIC ---
    const speedSlider = document.getElementById("speed-slider");
    
    // Function to calculate speed based on slider (1-10)
    // 1 = 1000ms, 10 = 100ms
    function updateSpeed() {
        const val = parseInt(speedSlider.value);
        // Formula: Higher slider = Lower delay (Faster)
        // Range approx: 1000ms down to 100ms
        GAME_SPEED = 1100 - (val * 100); 

        // CRITICAL: Update the CSS transition speed of the robot
        // so it glides faster/slower to match the logic
        const robot = document.getElementById("robot");
        if(robot) {
             // Convert ms to seconds for CSS
            const cssSpeed = GAME_SPEED / 1000;
            robot.style.transition = `left ${cssSpeed}s linear, bottom ${cssSpeed}s linear`;
        }
    }

    // Listen for changes
    speedSlider.addEventListener("input", updateSpeed);
    
    // Initialize speed on load
    updateSpeed();

    // --- RESET BUTTON LOGIC ---
    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", function() {
            // 1. Stop Loop
            isAnimating = false;
            isAutoPlaying = false;
            animationQueue = [];
            
            // 2. Disable CSS transition for instant snap back
            const robot = document.getElementById("robot");
            robot.style.transition = 'none';

            // 3. Reset Logic
            resetVisuals();
            
            // 4. Restore CSS transition after a split second
            setTimeout(() => {
                robot.style.transition = 'left 0.3s linear, bottom 0.3s linear';
            }, 50);

            // 5. Clear Console
            const out = document.getElementById("output");
            out.innerHTML = "<div style='color:#888'>Level Reset. Ready.</div>";
        });
    } else {
        console.error("Reset button not found in DOM");
    }
};

window.loadLevel = function(index) {
    currentLevel = levels[index];
    
    // Update Description
    const descLabel = document.getElementById("mission-desc");
    if(descLabel) {
        descLabel.innerText = currentLevel.description;
    }
    
    resetVisuals();
};

function resetVisuals() {
    // --- 1. DETERMINE GOAL LOCATION ---
    // Handle Random Goals
    if (currentLevel.randomGoal) {
        let rX, rY;
        // Don't spawn on the robot
        do {
            rX = Math.floor(Math.random() * 10);
            rY = Math.floor(Math.random() * 10);
        } while (rX === currentLevel.startX && rY === currentLevel.startY);
        
        currentLevel.currentGoalX = rX;
        currentLevel.currentGoalY = rY;
    }
    // Handle List of Goals
    else if (currentLevel.possibleGoals && currentLevel.possibleGoals.length > 0) {
        const randSpot = currentLevel.possibleGoals[Math.floor(Math.random() * currentLevel.possibleGoals.length)];
        currentLevel.currentGoalX = randSpot.x;
        currentLevel.currentGoalY = randSpot.y;
    } 
    // Handle Fixed Goals
    else {
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
    updateSprite(); 

    // --- 4. DRAW GOAL ---
    const goal = document.getElementById("goal");
    goal.style.display = "block";
    goal.style.left = (currentLevel.currentGoalX * 40) + "px";
    goal.style.bottom = (currentLevel.currentGoalY * 40) + "px";

    // --- 5. DRAW WALLS ---
    const container = document.getElementById("world-container");
    // Remove old walls
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
        } else if (w.side === 'S') {
            wallDiv.classList.add("wall-horizontal");
            wallDiv.style.left = (w.x * 40) + "px";
            wallDiv.style.bottom = (w.y * 40) - 3 + "px";
        } else if (w.side === 'W') {
             wallDiv.classList.add("wall-vertical");
            wallDiv.style.left = (w.x * 40) + "px"; 
            wallDiv.style.bottom = (w.y * 40) + "px";
        }
        
        container.appendChild(wallDiv);
    });

    // Reset console
    const out = document.getElementById("output");
    if(out) out.innerHTML = "<div style='color:#888'>Ready: " + currentLevel.name + "</div>";
}

// --- 4. WASM LOADER ---
const go = new Go();
WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject).then((result) => {
    go.run(result.instance);
    const runBtn = document.querySelector(".run-btn");
    if(runBtn) {
        runBtn.disabled = false;
        runBtn.innerText = "▶ Run Code";
    }
    console.log("Wasm loaded.");
});

// --- 5. SIMULATION ENGINE ---

window.addToAnimationQueue = (action) => {
    animationQueue.push(action);
    if (isAutoPlaying && !isAnimating) {
        processQueue();
    }
};

window.runSimulation = function() {
    isAutoPlaying = true;
    startCodeExecution();
}

window.stepSimulation = async function() {
    if (animationQueue.length === 0) {
        isAutoPlaying = false; 
        startCodeExecution();
        await new Promise(r => setTimeout(r, 100));
    }
    if (animationQueue.length > 0) {
        const action = animationQueue.shift();
        performAction(action);
    }
}

function startCodeExecution() {
    // 1. Visual Reset
    robotX = currentLevel.startX * 40;
    robotY = currentLevel.startY * 40;
    currentRotation = 0;
    
    const el = document.getElementById("robot");
    el.style.left = robotX + "px";
    el.style.bottom = robotY + "px";
    updateSprite();
    
    document.getElementById("output").innerHTML = "<div style='color:#888'>Executing...</div>";

    // 2. Prepare Data for Go
    let code = document.getElementById("editor").value;
    let wallsJson = JSON.stringify(currentLevel.walls);
    let goalX = currentLevel.currentGoalX;
    let goalY = currentLevel.currentGoalY;

    // 3. Call Go
    let result = window.runGoCode(code, wallsJson, goalX, goalY);
    
    if (result && result.startsWith("Code Error")) {
        log(result, "error");
    }
}

async function performAction(action) {
    const el = document.getElementById("robot");

    if (action === "move" || action === "moveForward") {
        const heading = currentRotation % 360;
        let nextX = robotX;
        let nextY = robotY;

        if (heading === 0) nextX += 40;
        else if (heading === 90) nextY += 40;
        else if (heading === 180) nextX -= 40;
        else if (heading === 270) nextY -= 40;

        // Collision Check
        if (checkCollision(nextX, nextY, heading)) {
            log("💥 CRASH! Hit a wall!", "error");
            el.style.transform = "scale(0.8)";
            setTimeout(() => el.style.transform = "scale(1)", 200);
            animationQueue = []; 
            isAnimating = false;
            setTimeout(() => showGameOver("💥 CRASH!", "You hit a wall!"), 500);
            return false;
        }

        robotX = nextX;
        robotY = nextY;
        el.style.left = robotX + "px";
        el.style.bottom = robotY + "px";

        // Goal Check
        const gX = Math.round(robotX / 40);
        const gY = Math.round(robotY / 40);
        if (gX === currentLevel.currentGoalX && gY === currentLevel.currentGoalY) {
            log("🏆 SUCCESS! You found the flag!", "success");
            animationQueue = [];
            isAnimating = false;
            setTimeout(() => showSuccessModal(), 500);
            return false;
        }
        
    } else if (action === "turnLeft") {
        currentRotation += 90;
        if (currentRotation >= 360) currentRotation -= 360;
        updateSprite();
    } 

    return true; 
}

async function processQueue() {
    if (animationQueue.length === 0) {
        if (!isAnimating) return;
        isAnimating = false;
        
        const gX = Math.round(robotX / 40);
        const gY = Math.round(robotY / 40);
        if (gX !== currentLevel.currentGoalX || gY !== currentLevel.currentGoalY) {
            log("Stopped.", "info");
        }
        return;
    }

    isAnimating = true;
    const action = animationQueue.shift();

    const keepGoing = await performAction(action);

    if (keepGoing) {
        await new Promise(r => setTimeout(r, GAME_SPEED)); 
        processQueue(); 
    }
}

function checkCollision(targetX, targetY, direction) {
    const currentGridX = Math.round(robotX / 40);
    const currentGridY = Math.round(robotY / 40);
    
    if (targetX < 0 || targetX > 360 || targetY < 0 || targetY > 360) return true;

    for (let w of activeWalls) {
        if (direction === 0 && w.side === 'E' && w.x === currentGridX && w.y === currentGridY) return true;
        if (direction === 180 && w.side === 'E' && w.x === (currentGridX - 1) && w.y === currentGridY) return true;
        if (direction === 90 && w.side === 'N' && w.x === currentGridX && w.y === currentGridY) return true;
        if (direction === 270 && w.side === 'N' && w.x === currentGridX && w.y === (currentGridY - 1)) return true;
        
        if (direction === 180 && w.side === 'W' && w.x === currentGridX && w.y === currentGridY) return true;
        if (direction === 0 && w.side === 'W' && w.x === (currentGridX + 1) && w.y === currentGridY) return true;
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
    if(!out) return;
    const div = document.createElement("div");
    div.className = "log-entry";
    if(type==="error") div.style.color = "#e74c3c";
    if(type==="success") div.style.color = "#2ecc71";
    div.innerText = "> " + msg;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
}

function showGameOver(title, reason) {
    const m = document.getElementById("game-over-modal");
    if(m) {
        document.getElementById("game-over-title").innerText = title;
        document.getElementById("game-over-reason").innerText = reason;
        m.classList.remove("hidden");
    }
}
function showSuccessModal() {
    const m = document.getElementById("success-modal");
    if(m) m.classList.remove("hidden");
}
window.closeModalAndReset = function() {
    const m = document.getElementById("game-over-modal");
    if(m) m.classList.add("hidden");
    resetVisuals();
}
window.closeSuccessModal = function() {
    const m = document.getElementById("success-modal");
    if(m) m.classList.add("hidden");
}