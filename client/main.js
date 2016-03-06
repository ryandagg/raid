var React = require('react');
var ReactDOM = require('react-dom');

// react bootstrap
var Accordion = require('react-bootstrap').Accordion;
var Button = require('react-bootstrap').Button;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Input = require('react-bootstrap').Input;
var Panel = require('react-bootstrap').Panel;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Well = require('react-bootstrap').Well;

// react ace
var AceEditor = require('react-ace');
var brace  = require('brace');
require('brace/mode/javascript');
require('brace/theme/chrome');


var GameRunner = require('../lib/GameRunner');
var ScoreEvent = require('../lib/ScoreEvent');
var CompilePlayerCode = require('../lib/CompilePlayerCode');
var TutorialVerbage = require('../lib/TutorialVerbage');
var GAReporter = require('../lib/GAReporter');


var ADVENTURE = "adventure";
var TUTORIAL = "tutorial";



var UnitStats = React.createClass({
    render: function() {
        var scoreOrPointsLabel, scoreOrPointsValue;
        if (!this.props.unit) {
            return (<p>No units in range</p>);
        }
        if (this.props.unit.defeatPoints) {
            scoreOrPointsLabel = "Value";
            scoreOrPointsValue = this.props.unit.defeatPoints;
        }
        else {
            scoreOrPointsLabel = "Score";
            scoreOrPointsValue = this.props.score;
        }
        return (
            <Well>
                <p>{this.props.unit.name}: {this.props.unit.type}   {this.props.unit.hp}/{this.props.unit.maxHp}</p>
                <p>{this.props.unit.description}</p>
                <p>{scoreOrPointsLabel}: {scoreOrPointsValue}</p>
                <p>Delay: {Math.round(100 * this.props.unit.delay) / 100}</p>
                <p>SightRadiusSquared: {this.props.unit.sensorRadiusSquared}</p>
            </Well>
        );
    }
});


var GameStats = React.createClass({
    slow: function() {
        this.props.setSpeed(600);
    },
    normal: function() {
        this.props.setSpeed(300);
    },
    fast: function() {
        this.props.setSpeed(150);
    },
    ultra: function() {
        this.props.setSpeed(75);
    },
    render: function() {
        var playPause = (<ButtonGroup><Button onClick={this.props.pause}>Pause</Button></ButtonGroup>);
        if (this.props.paused) {
            playPause = (
                <ButtonGroup>
                    <Button onClick={this.props.play}>Play</Button>
                    <Button onClick={this.props.step}>Step</Button>
                </ButtonGroup>

            );
        }
        return (
            <Well>
                <p>Round: {this.props.game.round}/{this.props.game.map.roundLimit}</p>
                {playPause}
                <ButtonGroup>
                    <Button onClick={this.slow}>.5x</Button>
                    <Button onClick={this.normal}>1x</Button>
                    <Button onClick={this.fast}>2x</Button>
                    <Button onClick={this.ultra}>4x</Button>
                </ButtonGroup>
            </Well>
        );
    }
});

var TableCell = React.createClass({
    render: function() {
        var classes = "tile"
        if (this.props.terrain.cssClass != this.props.mapCssClass) {
            classes += " " + this.props.terrain.cssClass;
        }
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var wid = (.8*w)/this.props.width;

        if (this.props.inSight) {
            classes += ' in-sight';
        }
        var style = {
            height: wid + "px"
        };
        var fontStyle = {
            fontSize: Math.ceil(.5 * wid) - 2 + "px"
        };
        var unit = this.props.unit;
        if (unit) {
            unit = unit.type;
        }
        if (!unit && this.props.isExit) {
            unit = "/"
        }
        return (
            <td className={classes} style={style}>
                <p style={fontStyle}>
                    {unit}
                </p>
            </td>
            )
    }
});

var TableRow = React.createClass({
    render: function() {
        var cells = [];
        for (var i = 0; i < this.props.terrain.length; i++) {
            var isExit = this.props.row === this.props.exit.y && i === this.props.exit.x;
            var inSight = Math.pow(this.props.row - this.props.playerLoc.y, 2) + Math.pow(i - this.props.playerLoc.x, 2) <= 64;
            cells.push(
                <TableCell
                    key={"c-" + this.props.gameId + "-" + i}
                    isExit={isExit}
                    height={this.props.height}
                    width={this.props.width}
                    terrain={this.props.terrain[i]}
                    unit={this.props.units[i]}
                    inSight={inSight}
                    mapCssClass={this.props.mapCssClass}
                />
            )
        }
        return (
            <tr>
                {cells}
            </tr>
            )
    }

});

var TableRenderer = React.createClass({
    render: function() {
        var rows = [];
        for (var i = 0; i < this.props.height; i++) {
            rows.push(<TableRow
                        height={this.props.height}
                        width={this.props.width}
                        key={this.props.gameId + "-" + i}
                        row={i}
                        gameId={this.props.gameId}
                        exit={this.props.exit}
                        units={this.props.units[i]}
                        terrain={this.props.terrain[i]}
                        playerLoc={this.props.playerLoc}
                        mapCssClass={this.props.cssClass}
                      />
            );
        }
        var style= {
            tableLayout: "fixed",
            "width": "100%"
        };
        return (
            <table id="map" className={this.props.cssClass} style={style}>
                <thead></thead>
                <tbody>{rows}</tbody>
            </table>
            );
    }
});

var samplePlayer = [
    "function RaidPlayer(playerController) {",
    "   this.pc = playerController;",
    "}",
    "",
    "RaidPlayer.prototype = {",
    "   act: function() {",
    "      if(this.pc.canMove(Direction.SOUTH)) {",
    "        this.pc.move(Direction.SOUTH);",
    "      }",
    "   }",
    "};",
];

var PlayerCode = React.createClass({
    onPlayerUpdate: function(playerCode) {
        this.setState({"player": playerCode});
    },
    getInitialState: function() {
        return {
            "player": samplePlayer.join('\n')
        }
    },
    onPlayerRun: function() {
        this.props.compileAndStart(this.state.player);
        return false;
    },
    render: function() {
        var lines = this.state.player.split('\n').length;
        return (
            <form>
                <Button onClick={this.onPlayerRun}>Run</Button>
                <AceEditor
                    mode="javascript"
                    theme="chrome"
                    ref="playerText"
                    label="RaidPlayer.js"
                    onChange={this.onPlayerUpdate}
                    value={this.state.player}
                    width="100%"
                    fontSize={14}
                    maxLines={50}
                    editorProps= {{
                        $blockScrolling: true,
                        $highlightActiveLine: true
                    }}
                />
            </form>
            )

    }
});

var API = React.createClass({
    //TODO: we need to change this to only return a subset if we are
    // on the tutorial levels
    render: function() {
        return (
            <Well>
                <h3>Raid API</h3>
                <Accordion>
                    <Panel header="PlayerController" eventKey="1">
                        <Accordion>
                            <Panel header="bool canMove(Direction d)" eventKey="1">
                                Returns true if the unit can move in Direction d and false otherwise
                            </Panel>
                            <Panel header="move(Direction d)" eventKey="2">
                                Moves the unit in direction d (adding delay). Throws an Error if that's not possible.
                            </Panel>
                            <Panel header="bool canMeleeAttack(Direction d)" eventKey="3">
                                Returns true if the unit can attack that direction
                            </Panel>
                            <Panel header="meleeAttack(Direction d)" eventKey="4">
                                Melee attacks in direction d
                            </Panel>
                            <Panel header="bool canMagicAttack(MapLocation m)" eventKey="5">
                                Returns true if the unit can attack that location
                            </Panel>
                            <Panel header="magicAttack(MapLocation m)" eventKey="6">
                                Magic attacks at m. Magic attacks do splash damage to nearby squares
                            </Panel>
                            <Panel header="bool canRangedAttack(MapLocation m)" eventKey="7">
                                Returns true if the unit can range attack that location
                            </Panel>
                            <Panel header="rangedAttack(MapLocation m)" eventKey="8">
                                Range attacks at m. Ranged attack does big damage with large range but has a minimum range.
                            </Panel>
                            <Panel header="double getDelay()" eventKey="9">
                                Get your player's current delay.
                            </Panel>
                            <Panel header="MapLocation getCurrentLocation()" eventKey="10">
                                Get your player's current location.
                            </Panel>
                            <Panel header="int getGameRound()" eventKey="11">
                                Get the current game round.
                            </Panel>
                            <Panel header="int getGameRoundLimit()" eventKey="12">
                                Gets the game round limit.
                            </Panel>
                            <Panel header="bool canSense(MapLocation m)" eventKey="13">
                                Returns true if m is in this units sensor range.
                            </Panel>
                            <Panel header="bool senseIfWall(MapLocation m)" eventKey="14">
                                Returns true if location m is a wall.
                            </Panel>
                            <Panel header="UnitInfo senseUnitAtLocation(MapLocation m)" eventKey="15">
                                Senses the unit at that location.
                            </Panel>
                            <Panel header="UnitInfo[] senseNearbyUnits()" eventKey="16">
                                Senses all units in sensorRange
                            </Panel>
                            <Panel header="Direction senseDirectionToExit()" eventKey="17">
                                Senses the direction to the level exit;
                            </Panel>
                            <Panel header="MapLocation senseExitLocIfClose()" eventKey="18">
                                Senses the location of the exit if you are close enough;
                            </Panel>

                        </Accordion>
                    </Panel>
                    <Panel header="MapLocation" eventKey="2">
                        <ul>
                            <li>int x: the east/west coordinate (east (0) -> west (width))</li>
                            <li>int y: the north/south cooredinate (north (0) -> south (height))</li>
                        </ul>
                        <Accordion>
                            <Panel header="MapLocation add(Direction d)" eventKey="1">
                                Adds direction d to this location and return a new location in that direction.
                            </Panel>
                            <Panel header="Direction directionTo(MapLocation m)" eventKey="2">
                                Returns the direction to move from this current to square to get to m.
                            </Panel>
                            <Panel header="int distanceSquaredTo(MapLocation m)" eventKey="3">
                                Returns the distance squared from this location to m.
                            </Panel>
                            <Panel header="bool isAdjacentTo(MapLocation m)" eventKey="4">
                                Returns true if this location is adjectent to m.
                            </Panel>
                            <Panel header="bool equals(MapLocation m)" eventKey="5">
                                Returns true if this location equals m.
                            </Panel>
                            <Panel header="String toString()" eventKey="6">
                                Returns the string representation of this lcoation.
                            </Panel>
                        </Accordion>
                    </Panel>
                    <Panel header="Direction" eventKey="3">
                        <ul>
                            <li>int x: the east/west component (east (-1) -> west (1))</li>
                            <li>int y: the north/south component (north (-1) -> south (1))</li>
                            <li>Direction.NORTH\SOUTH\EAST\WEST\NORTH_EAST\NORTH_WEST\SOUTH_EAST\SOUTH_WEST</li>
                            <li>Direction.OMNI - returned when you are at a location and do directionTo that same location</li>
                            <li>Direction.randomDirection() - returns a random direction (not including OMNI)</li>
                        </ul>
                        <Accordion>
                            <Panel header="bool equals(Direction d)" eventKey="1">
                                Returns true if this direction equals d.
                            </Panel>
                            <Panel header="Direction rotateLeft()" eventKey="2">
                                Returns the direction to the left. Ie NORTH.rotateLeft() -> NORTH_WEST
                            </Panel>
                            <Panel header="Direction rotateRight()" eventKey="3">
                                Returns the direction to the right. Ie NORTH.rotateRight() -> NORTH_EAST
                            </Panel>
                            <Panel header="Direction opposite()" eventKey="4">
                                Returns the opposite direction. Ie NORTH.opposite() -> SOUTH
                            </Panel>
                            <Panel header="bool isDiagonal()" eventKey="5">
                                Returns true if this direction is not cardinal
                            </Panel>
                            <Panel header="String toString()" eventKey="6">
                                Returns the string representation of this direction
                            </Panel>
                        </Accordion>
                    </Panel>
                    <Panel header="GameConstants" eventKey="4">
                        (access through GameContants.VAR_NAME)
                        <ul>
                            <li>MIN_RANGED_ATTACK_RADIUS_SQUARED: 16,</li>
                            <li>MAX_RANGED_ATTACK_RADIUS_SQUARED: 49,</li>
                            <li>MAX_MAGIC_ATTACK_RADIUS_SQUARED: 36,</li>
                            <li>MAGIC_ATTACK_SPLASH_PERCENTAGE: .25,</li>
                            <li>MAX_MELEE_ATTACK_RADIUS_SQUARED: 2,</li>
                            <li>SENSE_EXIT_THRESHOLD: 144,</li>
                            <li>PLAYER_MOVE_DELAY: 2,</li>
                            <li>PLAYER_MELEE_POWER: 6,</li>
                            <li>PLAYER_MELEE_DELAY: 2,</li>
                            <li>PLAYER_MAGIC_POWER: 4,</li>
                            <li>PLAYER_MAGIC_DELAY: 4,</li>
                            <li>PLAYER_RANGED_POWER: 6,</li>
                            <li>PLAYER_RANGED_DELAY: 3</li>
                        </ul>
                    </Panel>
                    <Panel header="UnitInfo" eventKey="5">
                        (note values are static / don't update unless you sense again)
                        <ul>
                            <li>name - the name of the unit</li>
                            <li>type - the symbol of the unit</li>
                            <li>hp - the current hp of the unit</li>
                            <li>maxHp - the maxHp of that unit</li>
                            <li>location - the maplocation of the unit when you sensed it</li>
                            <li>delay - the current delay of the unit (can't act until delay less than 1)</li>
                            <li>movementDelay - the delay incurred by movement</li>
                            <li>meleeAttackPower - how much damage a melee attack does</li>
                            <li>meleeAttackDelay - how much delay is incurred by melee attack (0 if can't attack)</li>
                            <li>magicAttackPower - how much damage a magic attack does</li>
                            <li>magicAttackDelay - how much delay is incurred by magic attack (0 if can't attack)</li>
                            <li>rangedAttackPower - how much damage a ranged attack does</li>
                            <li>rangedAttackDelay - how much delay is incurred by a ranged attack (0 if can't attack)</li>
                            <li>sensorRadiusSquared - how far the unit can see</li>
                            <li>alertRadiusSquared - once the unit sees you, it alerts nearby allies in this range</li>
                            <li>spawnDelay - how many turns after spawning a unit this unit can spawn another</li>
                            <li>currentSpawnDelay - how many turns until next unit is spawned</li>
                            <li>spawnedUnitType - what type of unit will be spawned</li>
                        </ul>
                    </Panel>
                </Accordion>
            </Well>
        );
    }

});


var SplashScreen = React.createClass({
    setAdventure: function() {
        this.props.setGameMode(ADVENTURE);
    },
    setTutorial: function() {
        this.props.setGameMode(TUTORIAL);
    },
    render: function() {
        return (
            <Well>
                <h1>Welcome to Rogue AI Dungeon!</h1>
                <br />
                <Button onClick={this.setTutorial}>Tutorial</Button>
                <Button onClick={this.setAdventure}>Adventure</Button>
            </Well>
        );
    }
});


var BetweenLevelContent = React.createClass({
    render: function() {
        if (this.props.mode === ADVENTURE) {
            return this.renderAdventure();
        } else {
            return this.renderTutorial();
        }

    },
    renderAdventure: function() {
        return (
            <Well>
                <h3>Adventure Level: {this.props.level}</h3>
                <p>{this.props.message}</p>
                <br />
                <p>Press Run to Continue</p>
                <br />
            </Well>
        );
    },
    renderTutorial: function() {
        i = 0;
        lines = TutorialVerbage(this.props.level);
        return (
            <Well>
                <h3>Tutorial Level: {this.props.level}</h3>
                <p><b>{this.props.message}</b></p>
                {lines.map(function(line) {
                    i++;
                    return <p key={i}>{line}</p>;
                })}
                <br />
                <p>Press Run to Continue</p>
                <br />
            </Well>
        );
    }
});


var Raid = React.createClass({
    getInitialState: function() {
        var gR = new GameRunner(this.updateGame);
        return {
            "gameRunner": gR,
            "game": null,
            "mode": null,
            "level": 1,
            "message": "Welcome!"
        }
    },
    compileAndStart: function(playerCode) {
        var playerCreator = CompilePlayerCode(playerCode);
        this.state.gameRunner.setPlayerCreator(playerCreator);
        this.startGame();
    },
    startGame: function() {
        this.state.gameRunner.createNewGame(this.state.level, this.state.mode === TUTORIAL);
        GAReporter.levelStart(this.state.mode, this.state.level);
        this.setState({"game": this.state.gameRunner.game});
        this.state.gameRunner.play();
    },
    updateGame: function(game) {
        if (!this.state.game) {
            return;
        }
        if (this.state.gameRunner.gameOver()) {
            if (this.state.gameRunner.won()) {
                this.state.gameRunner.updateScore({event: ScoreEvent.MAP_CLEARED, state: this.state});
                GAReporter.levelComplete(this.state.mode, this.state.level, this.state.game.round);
                this.setState({
                    "level": this.state.level + 1,
                    "game": null,
                    "message": "Congratulations! On to the next level"
                });
            } else {
                GAReporter.levelGameOver(this.state.mode, this.state.level, this.state.game.round);
                if (this.state.mode === TUTORIAL) {
                    this.setState({
                        "game": null,
                        "message": "Game Over! Try again?"
                    })
                } else {
                    this.setState({
                        "level": 1,
                        "game": null,
                        "message": "Game Over! Try again?"
                    })
                }

            }
        } else {
            this.setState({"game": game});
        }
    },
    setGameMode: function(mode) {
        GAReporter.startNewGame(mode);
        this.setState({"mode": mode});
    },
    setSpeed: function(speed) {
        this.state.gameRunner.setSpeed(speed);
    },
    render: function() {
        if (this.state.mode) {
            return this.renderGame()
        } else {
            return (<SplashScreen setGameMode={this.setGameMode} />);
        }
    },
    play: function() {
        this.state.gameRunner.play();
    },
    pause: function() {
        this.state.gameRunner.pause();
    },
    step: function() {
        this.state.gameRunner.step();
    },
    renderGame: function() {
        var content = (
            <BetweenLevelContent
                level={this.state.level}
                mode={this.state.mode}
                message={this.state.message}
            />);
        if (this.state.game) {
            var nearbyUnits = this.state.game.player.player.pc.senseNearbyUnits();
            var closestUnit = null;
            var closetUnitDistSq = 10000;
            for (var i = 0; i < nearbyUnits.length; i++) {
                var d = nearbyUnits[i].location.distanceSquaredTo(this.state.game.player.location);
                if (d < closetUnitDistSq) {
                    closestUnit = nearbyUnits[i];
                    closetUnitDistSq = d;
                }
            }
            content = (
                <Row>
                    <Col xs={12} md={9}>
                        <TableRenderer
                            width={this.state.game.map.width}
                            height={this.state.game.map.height}
                            exit={this.state.game.map.exit}
                            gameId={this.state.game.id}
                            terrain={this.state.game.map.terrain}
                            cssClass={this.state.game.map.cssClass}
                            units={this.state.game.map.units}
                            playerLoc={this.state.game.player.location}
                            />
                    </Col>
                    <Col xs={12} md={3}>
                        <Row>
                            <Col xs={4} md={12}>
                                <UnitStats unit={this.state.game.player} score={this.state.gameRunner.getScore()} />
                            </Col>
                            <Col xs={4} md={12}>
                                <UnitStats unit={closestUnit} />
                            </Col>
                            <Col xs={4} md={12}>
                                <GameStats
                                    setSpeed={this.setSpeed}
                                    game={this.state.game}
                                    paused={this.state.gameRunner.paused}
                                    play={this.play}
                                    pause={this.pause}
                                    step={this.step}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        }
        return (
            <Grid>
                {content}

                <Row>
                    <Col xs={12} md={12} lg={7}>
                        <PlayerCode compileAndStart={this.compileAndStart}/>
                    </Col>
                    <Col xs={12} md={12} lg={5}>
                        <API />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

ReactDOM.render(
    <Raid />,
    document.getElementById("content")
);