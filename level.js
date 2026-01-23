const levels = [
    // --- LEVEL 1: Basic Movement ---
    {
        id: 0,
        name: "1. Free Roam",
        description: "The flag moves randomly! Find it.",
        startX: 0, startY: 0,
        randomGoal: true, 
        walls: [] 
    },

    // --- LEVEL 2: The Hurdles ---
    {
        id: 1,
        name: "2. The Hurdles",
        description: "Jump over the walls. You must come down between them!",
        startX: 0, startY: 0,
        goalX: 8, goalY: 0,
        walls: [
            {x: 1, y: 0, side: 'E'}, 
            {x: 3, y: 0, side: 'E'},
            {x: 5, y: 0, side: 'E'}, 
            {x: 7, y: 0, side: 'E'},
            // Air Walls
            {x: 2, y: 1, side: 'E'}, 
            {x: 4, y: 1, side: 'E'},
            {x: 6, y: 1, side: 'E'},
            // Ceiling
            {x: 0, y: 1, side: 'N'}, {x: 1, y: 1, side: 'N'},
            {x: 2, y: 1, side: 'N'}, {x: 3, y: 1, side: 'N'},
            {x: 4, y: 1, side: 'N'}, {x: 5, y: 1, side: 'N'},
            {x: 6, y: 1, side: 'N'}, {x: 7, y: 1, side: 'N'},
            {x: 8, y: 1, side: 'N'}, {x: 9, y: 1, side: 'N'}
        ]
    },

    // --- LEVEL 3: Lucky Hurdles ---
    {
        id: 2,
        name: "3. Lucky Hurdles",
        description: "The flag hides in the gaps! You must jump down to check.",
        startX: 0, startY: 0,
        possibleGoals: [
            {x: 2, y: 0}, {x: 4, y: 0}, {x: 6, y: 0}, {x: 8, y: 0}
        ],
        walls: [
            {x: 1, y: 0, side: 'E'}, 
            {x: 3, y: 0, side: 'E'}, 
            {x: 5, y: 0, side: 'E'}, 
            {x: 7, y: 0, side: 'E'},
            // Air Walls
            {x: 2, y: 1, side: 'E'}, 
            {x: 4, y: 1, side: 'E'}, 
            {x: 6, y: 1, side: 'E'}, 
            // Ceiling
            {x: 0, y: 1, side: 'N'}, {x: 1, y: 1, side: 'N'}, {x: 2, y: 1, side: 'N'},
            {x: 3, y: 1, side: 'N'}, {x: 4, y: 1, side: 'N'}, {x: 5, y: 1, side: 'N'},
            {x: 6, y: 1, side: 'N'}, {x: 7, y: 1, side: 'N'}, {x: 8, y: 1, side: 'N'}
        ]
    },

    // --- LEVEL 4: Uneven Hurdles ---
    {
        id: 3,
        name: "4. Uneven Hurdles",
        description: "Some walls are higher. You must climb up AND down!",
        startX: 0, startY: 0,
        goalX: 9, goalY: 0,
        walls: [
            {x: 1, y: 0, side: 'E'}, 
            {x: 3, y: 0, side: 'E'}, {x: 3, y: 1, side: 'E'}, 
            {x: 5, y: 0, side: 'E'}, 
            {x: 7, y: 0, side: 'E'}, {x: 7, y: 1, side: 'E'}, 
            // Anti-Cheat Air Walls
            {x: 4, y: 2, side: 'E'}, 
            {x: 8, y: 2, side: 'E'}, {x: 8, y: 1, side: 'E'},
            // Ceilings
            {x: 0, y: 1, side: 'N'}, {x: 1, y: 1, side: 'N'}, {x: 2, y: 1, side: 'N'},
            {x: 3, y: 2, side: 'N'}, {x: 4, y: 2, side: 'N'}, 
            {x: 5, y: 1, side: 'N'}, {x: 6, y: 1, side: 'N'}, 
            {x: 7, y: 2, side: 'N'}, {x: 8, y: 2, side: 'N'}
        ]
    },

    // --- LEVEL 5: The Corner ---
    {
        id: 4,
        name: "5. The Corner",
        description: "You need to turn left to reach this flag.",
        startX: 0, startY: 0,
        goalX: 0, goalY: 2,
        walls: [
            {x: 0, y: 0, side: 'E'}, 
            {x: 0, y: 1, side: 'E'},
            {x: 0, y: 2, side: 'E'} 
        ]
    },

    // --- LEVEL 6: The Zig Zag ---
    {
        id: 5,
        name: "6. The Zig Zag",
        description: "Navigate the winding path using turns.",
        startX: 0, startY: 0,
        goalX: 3, goalY: 3,
        walls: [
            {x: 0, y: 0, side: 'N'}, {x: 1, y: 0, side: 'E'}, 
            {x: 1, y: 1, side: 'N'}, {x: 2, y: 1, side: 'E'},
            {x: 2, y: 2, side: 'N'}, {x: 3, y: 2, side: 'E'}
        ]
    },

   

    // --- LEVEL 7: The Spiral ---
    {
        id: 6,
        name: "7. The Spiral",
        description: "A long spiral path. Use functions to keep your code clean!",
        startX: 0, startY: 0,
        goalX: 4, goalY: 3,
        walls: [
            {x:0,y:0,side:'N'}, {x:1,y:0,side:'N'}, {x:2,y:0,side:'N'}, {x:3,y:0,side:'N'},
            {x:4,y:0,side:'N'}, {x:5,y:0,side:'N'}, {x:6,y:0,side:'N'}, {x:7,y:0,side:'N'},
            {x:7,y:1,side:'E'}, {x:7,y:2,side:'E'}, {x:7,y:3,side:'E'}, {x:7,y:4,side:'E'},
            {x:7,y:5,side:'E'}, {x:7,y:6,side:'E'}, {x:7,y:7,side:'E'}, 
            {x:0,y:7,side:'N'}, {x:1,y:7,side:'N'}, {x:2,y:7,side:'N'}, {x:3,y:7,side:'N'}, 
            {x:4,y:7,side:'N'}, {x:5,y:7,side:'N'}, {x:6,y:7,side:'N'},
            {x:1,y:3,side:'E'}, {x:1,y:4,side:'E'}, {x:1,y:5,side:'E'}, {x:1,y:6,side:'E'}, {x:1,y:7,side:'E'},
            {x:2,y:2,side:'N'}, {x:3,y:2,side:'N'}, {x:4,y:2,side:'N'}, {x:5,y:2,side:'N'},
            {x:5,y:3,side:'E'}, {x:5,y:4,side:'E'},
            {x:3,y:4,side:'N'}, {x:4,y:4,side:'N'},
            {x:3,y:4,side:'E'} 
        ]
    }
];