
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
        case 0: return [21, 31];
        case 1: return [31, 46];
        case 2: return [41, 61];
        case 3: return [51, 76];

        case 4: return [31, 46];
        case 5: return [51, 76];
        case 6: return [71, 106];
        case 7: return [91, 136];
    }
}

function getEnemiesForLevel(level, difficulty) {
    if (difficulty < 3) {
        // EASY ENEMIES
        // up to level 30
        switch(level) {
            //[primary, secondary, swarm, rare, boss]
            // Forest Level
            case 1: return [UnitType.GIANT_TICK, UnitType.QUILL_BOAR, UnitType.GNAT, UnitType.WORM, UnitType.WUMPUS];
            // Camp Level
            case 2: return [UnitType.ORC, UnitType.ORC, UnitType.GNAT, UnitType.TROLL, UnitType.GIANT];
            // Mountain Pass Level
            case 3: return [UnitType.ROCKS, UnitType.ROCKS, UnitType.FLY, UnitType.BULL, UnitType.YETI];
            // Cave Level
            case 4: return [UnitType.HOBGOBLIN, UnitType.KOBOLD, UnitType.FLY, UnitType.UMBER_HULK, UnitType.NECROMANCER];
            // Swamp Level
            case 5: return [UnitType.GIANT_TICK, UnitType.GIANT_FROG, UnitType.FLY, UnitType.TROLL, UnitType.WUMPUS];
            // Dessert level
            case 6: return [UnitType.SCORPION, UnitType.REPTILE, UnitType.JACKEL, UnitType.BOVARD, UnitType.GIANT];
            // Dessert Camp level
            case 7: return [UnitType.ZOMBIE, UnitType.GHOST, UnitType.JACKEL, UnitType.LICH, UnitType.GIANT_LOUSE];
            // Deep Woods level
            case 8: return [UnitType.ZOMBIE, UnitType.SKELETON, UnitType.MOLD, UnitType.VAMPIRE, UnitType.NECROMANCER];
            // Sewer level
            case 9: return [UnitType.HOBGOBLIN, UnitType.KOBOLD, UnitType.MOLD, UnitType.UMBER_HULK, UnitType.WUMPUS];
            // Maze level
                // (maze doesn't have primary, secondary or swam)
            case 0: return [false, false, false, UnitType.MINOTAUR, UnitType.CHRIS];
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