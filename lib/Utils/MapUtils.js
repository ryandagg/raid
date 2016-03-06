var Direction = require('../GameObjects/Direction');


function getDirectionFromDiff(diffX, diffY) {
    var scaler = Math.max(Math.abs(diffX), Math.abs(diffY));
    if (scaler === 0) {
        return Direction.OMNI;
    }
    return new Direction(Math.round(diffX/scaler), Math.round(diffY/scaler));
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    "getDirectionFromDiff": getDirectionFromDiff,
    "getRandomFromRange": getRandomFromRange
};