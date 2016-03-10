var Point = require('./Point');

module.exports = {
	linearlyInterpolate: function(startPoint, endPoint, step, totalSteps){
		var offset = endPoint.subtract(startPoint),
			fraction = step/totalSteps;
		offset.x(offset.x() * fraction);
		offset.y(offset.y() * fraction);
		return startPoint.add(offset);
	}
};