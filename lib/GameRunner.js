var Game = require('./Game');

var PLAYER = 'p';
var CREEPS = 'c';

function GameRunner(requestRender) {
    this.requestRender = requestRender;
    this.lastTurn = CREEPS;
    this.loopSpeed = 300;
    this.paused = false;
    this.playerCreator = null;
    this.timeoutId = null;
}

GameRunner.prototype = {
    createNewGame: function(level, tutorial) {
        this.game = new Game(this.playerCreator, level, tutorial);
        clearTimeout(this.timeoutId);
    },
    setPlayerCreator: function(playerCreator) {
        this.playerCreator = playerCreator;
    },
    play: function() {
        this.paused = false;
        clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(function() {
            this._runTurn();
        }.bind(this), this.loopSpeed);
        this.requestRender(this.game);
    },
    pause: function() {
        this.paused = true;
        this.requestRender(this.game);
    },
    setSpeed: function(speed) {
        this.loopSpeed = speed;
        this.requestRender(this.game);
    },
    _runTurn: function() {
        if (this.paused) {
            return;
        }
        if (this.gameOver()) {
            this.requestRender(this.game);
            this.paused = true;
            return;
        }

        this.takeTurn();
        this.requestRender(this.game);
        if (!this.paused) {
            this.timeoutId = clearTimeout(this.timeoutId);
            setTimeout(function() {
                this._runTurn();
            }.bind(this), this.loopSpeed);
        }
    },
    step: function() {
        this.takeTurn();
        this.requestRender(this.game);
    },
    takeTurn: function() {
        if (this.lastTurn === CREEPS) {
            this.game.upkeep();
            this.game.executePlayerTurn();
            this.game.removeDeadUnits();
            this.lastTurn = PLAYER;
        }  else {
            try {
                this.game.executeCreepTurns();
            } catch (e) {
                console.log(e);
            }
            this.lastTurn = CREEPS;
        }
    },
    won: function() {
        return this.game.won();
    },
    gameOver: function() {
        return this.game.gameOver();
    }
};

module.exports = GameRunner;