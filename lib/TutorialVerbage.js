




var levelOne = [
    "In this level you need to make your way to exit! (marked by /)",
    "",
    "In the API pay special attention to the PlayerController.senseDirectionToExit() function",
    "    example: var direction = this.pc.senseDirectionToExit()",
    "",
    "Your current player is quite dumb and won't be able to make there without your help!",
    "",
    "You may find outputing things to the console helpful. Here's how to get to consoles in various browsers:",
    "http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers#8555",
    "",
    "Good luck!"
];

var levelTwo = [
    "In this level several walls block your way!",
    "",
    "You will need to add some advanced path finding later, but for now you should pay close attention to Direction.rotateLeft(), rotateRight()!",
    "If a wall is blocking your path, often the best choice is to rotate until you find a clear direction!",
    "",
    "Good luck!"
];

var levelThree = [
    "In this level you face your first opponent, a giant frog!",
    "",
    "Use this.pc.senseNearbyUnits() to see if there are any nearby enemies",
    "You should be able to easily defeat the giant frog using canMeleeAttack and meleeAttack when adjacent to the giant frog!",
    "",
    "Good luck!"
];

var levelFour = [
    "In this level you face several giant frogs!",
    "",
    "Use what you've learned last level and you should be fine",
    "",
    "Good luck!"
];

var levelFive = [
    "In this level you face a swarm of gnats!",
    "",
    "Gnats are fast but have very low HP (1)",
    "Kill them with magic if you want to survive!",
    "",
    "Good luck!"
];


var levelSix = [
    "In this level you face your first ranged enemy, a quill boar!",
    "",
    "Kill them it with rangedAttack if you want to survive!",
    "",
    "Good luck!"
];


var levelSeven = [
    "In this level you face off against an evil necromacer!",
    "",
    "You'll have to use all that you have learned to defeat him.",
    "You may even need to heal. Make sure to check your hp before healing!",
    "",
    "Good luck!"
];


var complete = [
    "Congratulations you have beat the tutorial!",
    "",
    "Copy your player and refresh the page, you are ready for adventure mode!",
    "",
    "Good luck!"
];

function getMDForLevel(level) {
    switch(level) {
        case 1:
            return levelOne;
        case 2:
            return levelTwo;
        case 3:
            return levelThree;
        case 4:
            return levelFour;
        case 5:
            return levelFive;
        case 6:
            return levelSix;
        case 7:
            return levelSeven;
        default:
            return complete;
    }

}

module.exports = getMDForLevel;