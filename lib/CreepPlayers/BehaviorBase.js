
function BehaviorBase(creepController) {
    this.cc = creepController;
}

BehaviorBase.prototype = {
    act: function() {
        return false;
    }
};

module.exports = BehaviorBase;
