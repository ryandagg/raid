var GraphicsConstants = require('./GraphicsConstants');
var Point = require('./Point');

function getTileImg(tileName){
	var tileImgSrc = null;
	var path = GraphicsConstants.FX_TEXTURES_ROOT_DIR;
	switch(tileName.toLowerCase()){
		case "cement":
			tileImgSrc = path + "cement.png";
			break;
		case "wall":
			tileImgSrc = path + "wall.png";
			break;
		default:
			throw "unknown tile name";
	}
	var img = new Image();
	img.src = tileImgSrc;
	return img;
}

/*******************
	Constructor
********************/
function MapRenderer(fx){
	this.fx = fx;
}

MapRenderer.prototype.render = function(mapState){
	var tileHeight = this.fx.getCanvasHeight() / mapState.height,
		tileWidth = this.fx.getCanvasWidth() / mapState.width; 
	for(var rowi = 0; rowi < mapState.height; rowi++){
		for(var coli = 0; coli < mapState.width; coli++){
			var tile = mapState.terrain[rowi][coli],
				tileX = coli * tileWidth,
				tileY = rowi * tileHeight,
				tileImg = getTileImg.call(this, tile.name);
			// Calculate scale factor in x and y axis that will scale tile img to fit target
			var scaleX = tileWidth / tileImg.width;
			var scaleY = tileHeight / tileImg.height;
			this.fx.drawImage({
				img: tileImg,
				centerPoint: new Point(0,0),
				target: new Point(tileX, tileY),
				scaleX: scaleX,
				scaleY: scaleY
			});
		}
	}
};

MapRenderer.prototype.getCanvasPosFromMapPos = function(mapPos, mapState){
	var tileHeight = this.fx.getCanvasHeight() / mapState.height,
		tileWidth = this.fx.getCanvasWidth() / mapState.width,
		tileHalfHeight = tileHeight / 2,
		tileHalfWidth = tileWidth / 2;
	return new Point(mapPos.x * tileWidth + tileHalfWidth, mapPos.y * tileHeight + tileHalfHeight);
};

module.exports = MapRenderer;