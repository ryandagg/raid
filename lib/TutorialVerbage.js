/*
 - REMEMBER TO ESCAPE BACKTICKS
 - TABS CREATE BLOCKQUOTES IN MARKDOWN
 */

var levelOne =
`In this level you need to make your way to exit! (marked by /)

In the API pay special attention to the \`PlayerController.senseDirectionToExit()\` function, e.g.:

\`\`\`js
var direction = this.pc.senseDirectionToExit();
if (this.pc.canMove(direction)) {
    console.log("Moving", direction.toString());
    this.pc.move(direction);
    return;
}
console.log("can't move!");
\`\`\`

Your current player is quite dumb and won't be able to make there without your help!

__TIP:__ [Console output will be helpful in debugging your AI!](http://webmasters.stackexchange.com/questions/8525/how-to-open-the-javascript-console-in-different-browsers#77337)`;

var levelTwo =
`In this level several walls block your way!

You will need to add some advanced path finding later, but for now you should pay close attention to \`Direction.rotateLeft()\`, \`rotateRight()\`!

If a wall is blocking your path, often the best choice is to rotate until you find a clear direction!

\`\`\`js
var direction = this.pc.senseDirectionToExit();
var idx = 0;
while (!this.pc.canMove(direction) && idx < 10) {
    console.log("rotating left!")
    direction = direction.rotateLeft();
}
if (this.pc.canMove(direction)) {
    console.log("Moving", direction.toString());
    this.pc.move(direction);
    return;
}
console.log("can't move!");
\`\`\``;

var levelThree =
`In this level you face your first opponent, a giant frog!

Use \`this.pc.senseNearbyUnits()\` to see if there are any nearby enemies.

You should be able to easily defeat the giant frog using canMeleeAttack and meleeAttack when adjacent to the giant frog!

\`\`\`js
var units = this.pc.senseNearbyUnits();
for (var i = 0; i < units.length; i++) {
    if (this.pc.canMeleeAttack(units[i].location)) {
        console.log("attacking unit at location ", units[i].location.toString());
        this.pc.meleeAttack(units[i].location);
        return;
    }
}
console.log("Can't melee attack anything!");
\`\`\``;

var levelFour =
`In this level you face several giant frogs!

Use what you've learned last level and you should be fine.`;

var levelFive =
`In this level you face a swarm of gnats!

Gnats are fast but have very low HP (1)

Kill them with magic if you want to survive!`;

var levelSix =
`In this level you face your first ranged enemy, a quill boar!

Kill them it with rangedAttack if you want to survive!`;

var levelSeven =
`In this level you face off against an evil necromancer!

You'll have to use all that you have learned to defeat him.

You may even need to heal. Make sure to check your hp before healing!`;

var complete =
`__Congratulations__, you have beat the tutorial!

Your player has been saved to local storage (unless you don't allow that sort of thing!). You can also copy your code, of course.

Now refresh this page and take on __Adventure Mode__!`;

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