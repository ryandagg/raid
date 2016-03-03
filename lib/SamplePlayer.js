
function RaidPlayer(playerController) {
    this.pc = playerController;
    this.lastLoc = this.pc.getCurrentLocation();
}

RaidPlayer.prototype = {
    act: function() {
        var i, e;
        var ourLoc = this.pc.getCurrentLocation();
        var enemies = this.pc.senseNearbyUnits();
        for (i = 0; i < enemies.length; i++) {
            e = enemies[i];
            if (e.location.isAdjacentTo(ourLoc)) {
                if (this.pc.canMeleeAttack(ourLoc.directionTo(e.location))) {
                    this.pc.meleeAttack(ourLoc.directionTo(e.location));
                }
            }
        }

        if (this.pc.getDelay() > 1) {
            return;
        }

        for (i = 0; i < enemies.length; i++) {
            e = enemies[i];
            if (e.hp > 1) {
                if (this.pc.canRangedAttack(e.location)) {
                    this.pc.rangedAttack(e.location);
                }
            }

        }

        if (this.pc.getDelay() > 1) {
            return;
        }

        for (i = 0; i < enemies.length; i++) {
            e = enemies[i];
            if (this.pc.canMagicAttack(e.location)) {
                this.pc.magicAttack(e.location);
            }
        }

        if (this.pc.getDelay() > 1) {
            return;
        }

        if (enemies.length > 0) {
            var toEnemy = ourLoc.directionTo(enemies[0].location);
            if (this.pc.canMove(toEnemy)) {
                this.pc.move(toEnemy);
            } else if (this.pc.canMove(toEnemy.rotateLeft())) {
                this.pc.move(toEnemy.rotateLeft());
            } else if (this.pc.canMove(toEnemy.rotateRight())) {
                this.pc.move(toEnemy.rotateRight());
            }
        }

        if (this.pc.getDelay() > 1) {
            return;
        }

        var toMove = this.pc.senseDirectionToExit();

        if (this.pc.canMove(toMove)) {
            this.lastLoc = ourLoc;
            this.pc.move(toMove);
        } else if (this.pc.canMove(toMove.rotateLeft())) {
            this.lastLoc = ourLoc;
            this.pc.move(toMove.rotateLeft());
        } else if (this.pc.canMove(toMove.rotateRight())) {
            this.lastLoc = ourLoc;
            this.pc.move(toMove.rotateRight());
        }

        if (this.pc.getDelay() > 1) {
            return;
        }

        if (this.pc.canMove(toMove.rotateLeft().rotateLeft()) && !ourLoc.add(toMove.rotateLeft().rotateLeft()).equals(this.lastLoc)) {
            this.lastLoc = ourLoc;
            this.pc.move(toMove.rotateLeft().rotateLeft());
        } else if (this.pc.canMove(toMove.rotateRight().rotateRight())  && !ourLoc.add(toMove.rotateRight().rotateRight()).equals(this.lastLoc)) {
            this.lastLoc = ourLoc;
            this.pc.move(toMove.rotateRight().rotateRight());
        }

        if (this.pc.getDelay() > 1) {
            return;
        }

        var idx = 0;
        while (this.pc.getDelay() < 1 && idx < 16) {
            idx++;
            var d = Direction.randomDirection();
            if (this.pc.canMove(d)) {
                this.pc.move(d)
            }
        }
    }
};

