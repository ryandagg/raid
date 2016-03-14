function RaidPlayer(playerController) {
    this.pc = playerController;
    var loc = this.pc.getCurrentLocation();
    this.tail = [loc, loc, loc, loc, loc, loc, loc, loc, loc, loc, loc, loc, loc];
    this.tailIDX = 0;
}

RaidPlayer.prototype = {
    tryRangedAttack: function(enemies) {
        for (i = 0; i < enemies.length; i++) {
            var e = enemies[i];
            if (e.hp > 1) {
                if (this.pc.canRangedAttack(e.location)) {
                    this.pc.rangedAttack(e.location);
                    return true;
                }
            }
        }
        return false;
    },
    tryMeleeAttack: function(enemies) {
        for (i = 0; i < enemies.length; i++) {
            var e = enemies[i];
            if (e.hp > 1) {
                if (this.pc.canMeleeAttack(e.location)) {
                    this.pc.meleeAttack(e.location);
                    return true;
                }
            }
        }
        return false;
    },
    tryMagicAttack: function(enemies) {
        for (i = 0; i < enemies.length; i++) {
            var e = enemies[i];
            if (e.hp > 1) {
                if (this.pc.canMagicAttack(e.location)) {
                    this.pc.magicAttack(e.location);
                    return true;
                }
            }
        }
        return false;
    },
    killSpawners: function(enemies) {

        var spawners = enemies.filter(function (e) {
            return e.spawnedUnitType;
        });

        if (spawners.length === 0) {
            return false;
        }

        if (this.tryRangedAttack(spawners)) {
            return true;
        } else if (this.tryMeleeAttack(spawners)) {
            return true;
        }

        return false;
    },
    killSwarm: function(enemies) {
        if (enemies.length === 0) {
            return false;
        }
        if (enemies.length === 1) {
            return this.tryMeleeAttack(enemies);
        }

        var minX = 10000, minY = 100000, maxX = -1, maxY = -1;
        enemies.forEach(function(e) {
            minX = Math.min(e.location.x, minX);
            maxX = Math.max(e.location.x, maxX);
            minY = Math.min(e.location.y, minY);
            maxY = Math.max(e.location.y, maxY);
        });

        var bestLoc = null;
        var bestScore = 0;
        var loc, hits;
        for (var i = minX; i <= maxX; i++) {
            for (var j = minY; j <= maxY; j++) {
                loc = new MapLocation(i, j);
                if (loc.distanceSquaredTo(this.loc) > GameConstants.MAX_MAGIC_ATTACK_RADIUS_SQUARED) {
                    continue;
                }
                hits = enemies.filter(function (e) {e.location.isAdjacentTo(loc) || e.location.equals(loc)}).length;
                if (hits > bestScore) {
                    bestScore = hits;
                    bestLoc = loc;
                }

            }

        }
        if (bestLoc && this.pc.canMagicAttack(bestLoc)) {
            this.pc.magicAttack(bestLoc);
            return true;
        }
        return false;
    },
    update: function() {
        this.loc = this.pc.getCurrentLocation();
    },
    act: function() {
        this.update();
        var i, e;
        var ourLoc = this.pc.getCurrentLocation();
        var enemies = this.pc.senseNearbyUnits();
        var activeEnemies = enemies.filter(function(unit) { return unit.active; });

        if (activeEnemies.length > 0) {
            if (this.killSpawners(activeEnemies)) {
                return true;
            }
            var closestEnemies = activeEnemies.sort(function(a, b) { return ourLoc.distanceSquaredTo(a.location) - ourLoc.distanceSquaredTo(b.location)});

            var swarmEnemies = activeEnemies.filter(function(e) { return e.hp <= 6; });

            if (swarmEnemies.length > 0 && this.killSwarm(swarmEnemies)) {
                return true;
            }

            if (this.tryMeleeAttack(closestEnemies)) {
                return true;
            }
            if (this.tryRangedAttack(closestEnemies)) {
                return true;
            }
        }


        var toMove = this.pc.senseDirectionToExit();
        if (enemies.length > 0) {
            toMove = ourLoc.directionTo(enemies[0].location);
        }

        var idx = 0;
        var done = false;
        while (!done) {
            done = this.pc.canMove(toMove);
            done = done && !this.inTail(ourLoc.add(toMove));

            idx += 1;
            if (idx > 10) {
                done = true;
            }

            if (!done) {
                toMove = toMove.rotateLeft();
            }
        }


        if (this.pc.canMove(toMove)) {
            this.addToTail(ourLoc.add(toMove));
            this.pc.move(toMove);
        }


        if (this.pc.getDelay() > 1) {
            return;
        }

        idx = 0;
        while (this.pc.getDelay() < 1 && idx < 16) {
            idx++;
            var d = Direction.randomDirection();
            if (this.pc.canMove(d)) {
                this.pc.move(d);
            }
        }
    },
    addToTail: function(loc) {
        this.tail[this.tailIDX] = loc;
        this.tailIDX += 1;
        this.tailIDX = this.tailIDX % this.tail.length;
    },
    inTail: function(loc) {
        return this.tail.filter(
            function (l) {
                return l.equals(loc);
            }
        ).length > 0;
    }
};
