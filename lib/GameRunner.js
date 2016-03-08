var Game = require('./Game');
var ScoreManager = require('./ScoreManager');
var ScoreEvent = require('./ScoreEvent');

var PLAYER = 'p';
var CREEPS = 'c';

// Polyfill for window.requestAnimationFrame
(function(){
    var lastTime = 0;

    function requestAnimPolyfill(func) {
        var currTime = (new Date()).getTime();
        var timeToWait = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { func(currTime + timeToWait); }, timeToWait);
        lastTime = currTime + timeToWait;
        return id;
    }

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimPolyfill;
})();

function GameRunner(requestRender) {
    this.requestRender = requestRender;
    this.lastTurn = CREEPS;
    this.loopSpeed = 300;
    this.paused = false;
    this.playerCreator = null;
    this.requestID = null;
    this.scoreManager = new ScoreManager();
    this.lastTurnTimestamp = null;
}

GameRunner.prototype = {
    createNewGame: function(level, tutorial) {
        this.game = new Game(this.playerCreator, level, tutorial);
        window.cancelAnimationFrame(this.requestID);
    },
    setPlayerCreator: function(playerCreator) {
        this.playerCreator = playerCreator;
    },
    play: function() {
        this.paused = false;
        window.cancelAnimationFrame(this.requestID);

        this.requestID = window.requestAnimationFrame(function(timestamp) {
            this._runTurn(0);
        }.bind(this));
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
    _runTurn: function(timestamp) {
        // Regulate logic updates to loopSpeed but unlock rendering to happen every loop cycle
        if(!this.lastTurnTimestamp || (timestamp - this.lastTurnTimestamp) > this.loopSpeed){
            this.lastTurnTimestamp = timestamp;
            if (this.paused) {
                return;
            }
            if (this.gameOver()) {
                this.requestRender(this.game);
                this.paused = true;
                return;
            }

            this.takeTurn();
        }
        this.requestRender(this.game);
        if (!this.paused) {
            window.cancelAnimationFrame(this.requestID);
            this.requestID = window.requestAnimationFrame(function(timestamp) {
                this._runTurn(timestamp);
            }.bind(this));
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
            var removedUnits = this.game.removeDeadUnits();
            if (removedUnits.length > 0) {
                this.scoreManager.updateScore({event: ScoreEvent.DEFEAT_ENEMY, state: this, units: removedUnits});
            }
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
    getScore: function() {
        return this.scoreManager.getScore();
    },
    updateScore: function(params) {
        this.scoreManager.updateScore(params);
    },
    won: function() {
        return this.game.won();
    },
    gameOver: function() {
        return this.game.gameOver();
    },
    getSpeed: function(){
        return this.loopSpeed;
    }
};

module.exports = GameRunner;