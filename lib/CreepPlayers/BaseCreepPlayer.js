
function BaseCreepPlayer(creepController) {
    this.cc = creepController;
}

BaseCreepPlayer.prototype = {
    alertAllies: function() {
        this.cc.alertAllies();
    },
    act: function() {
        throw Error("Not implemented");
    }
};

module.exports = BaseCreepPlayer;
