
UnitFactory = require('../UnitFactory');
UnitType = require('../UnitType');

function getNumberOfEnemiesAtDifficulty(difficulty) {
    difficulty = difficulty % 4;
    switch(difficulty) {
        //[primary, secondary, swarm, rare, boss]
        case 0: return [15, 5, 0, 0, 0];
        case 1: return [20, 10, 10, 0, 0];
        case 2: return [30, 15, 15, 5, 0];
        case 3: return [35, 20, 20, 8, 1];
    }
}

function getMapSizeForDifficulty(difficult) {
    difficulty = difficulty % 4;
    switch(difficulty) {
        case 0: return [11, 16];
        case 1: return [21, 31];
        case 2: return [31, 46];
        case 3: return [41, 61];

        case 4: return [21, 31];
        case 5: return [41, 61];
        case 6: return [61, 91];
        case 7: return [81, 121];
    }
}

function getEnemiesForLevel(level, difficulty) {
    if (difficulty < 3) {
        // EASY ENEMIES
        // up to level 30
        switch(level) {
            //[primary, secondary, swarm, rare, boss]
            // Forest Level
            case 1: return [null, null, null, null, null];
            // Camp Level
            case 2: return [null, null, null, null, null];
            // Mountain Pass Level
            case 3: return [null, null, null, null, null];
            // Cave Level
            case 4: return [null, null, null, null, null];
            // Ocean Level
            case 5: return [null, null, null, null, null];
            // Dessert level
            case 6: return [null, null, null, null, null];
            // Dessert Camp level
            case 7: return [null, null, null, null, null];
            // Deep Woods level
            case 8: return [null, null, null, null, null];
            // Sewer level
            case 9: return [null, null, null, null, null];
            // Maze level
                // (maze doesn't have primary, secondary or swam)
            case 0: return [false, false, false, null, null];
        }
    } else {
        // HARD ENEMIES
        // level 30 - 60
        switch(level) {
            //[primary, secondary, swarm, rare, boss]
            // Forest Level
            case 1: return [null, null, null, null, null];
            // Camp Level
            case 2: return [null, null, null, null, null];
            // Mountain Pass Level
            case 3: return [null, null, null, null, null];
            // Cave Level
            case 4: return [null, null, null, null, null];
            // Ocean Level
            case 5: return [null, null, null, null, null];
            // Dessert level
            case 6: return [null, null, null, null, null];
            // Dessert Camp level
            case 7: return [null, null, null, null, null];
            // Deep Woods level
            case 8: return [null, null, null, null, null];
            // Sewer level
            case 9: return [null, null, null, null, null];
            // Maze level
                // (maze doesn't have primary, secondary or swam)
            case 0: return [false, false, false, null, null];
        }
    }
}

module.exports = {
    "getNumberOfEnemiesAtDifficulty": getNumberOfEnemiesAtDifficulty,
    "getMapSizeForDifficulty": getMapSizeForDifficulty,
    "getEnemiesForLevel": getEnemiesForLevel
};