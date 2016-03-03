
var GameConstants = require('../GameConstants');
var MoveUtils = require('../Utils/MoveUtils');
var BaseCreepPlayer = require('./BaseCreepPlayer');
var UnitType = require('../UnitType');


function NecromancerPlayer(creepController) {
    this.cc = creepController;
}

NecromancerPlayer.prototype = Object.create(BaseCreepPlayer.prototype);

NecromancerPlayer.prototype.act = function() {
    var playerLoc = this.cc.getPlayerInfo().location;
    var ourLoc = this.cc.getCurrentLocation();
    var toPlayer = ourLoc.directionTo(playerLoc);
    var distSqToPlayer = ourLoc.distanceSquaredTo(playerLoc);

    if (this.cc.getSpawnDelay() < 1) {
        if (this.cc.canSpawn(UnitType.SKELETON, toPlayer)) {
            this.cc.spawnUnit(UnitType.SKELETON, toPlayer);
        } else if (this.cc.canSpawn(UnitType.SKELETON, toPlayer.rotateLeft())) {
            this.cc.spawnUnit(UnitType.SKELETON, toPlayer.rotateLeft());
        } else if (this.cc.canSpawn(UnitType.SKELETON, toPlayer.rotateRight())) {
            this.cc.spawnUnit(UnitType.SKELETON, toPlayer.rotateRight());
        }
    }
    if (this.cc.getDelay() >= 1) {
        return;
    }
    var skeleNearby = this.cc.senseNearbyUnits().filter(function(u) { return u.type === UnitType.SKELETON}).length > 0;

    if (skeleNearby) {
        if (this.cc.canRangedAttack(playerLoc)) {
            this.cc.rangedAttack(playerLoc);
        }
        if (distSqToPlayer < GameConstants.MIN_RANGED_ATTACK_RADIUS_SQUARED) {
            MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer.opposite());
        } else {
            MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer);
        }
    } else {
        MoveUtils.tryMoveAheadLeftRight(this.cc, toPlayer.opposite());
        if (this.cc.canRangedAttack(playerLoc)) {
            this.cc.rangedAttack(playerLoc);
        }
        MoveUtils.tryMoveAheadLeftRightSideways(this.cc, toPlayer.opposite());
    }

};

module.exports = NecromancerPlayer;

