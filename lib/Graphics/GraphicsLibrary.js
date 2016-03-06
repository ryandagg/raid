var GraphicsConstants = require('./GraphicsConstants');
var BoundingBox = require('./BoundingBox');
var Point = require('./Point');
var clone = require('clone');

function GraphicsLibrary(canvas){
	this._canvas = canvas;
	this._ctx = this._canvas.getContext("2d");
};

GraphicsLibrary.prototype.windowCoords2canvasPoint = function(windowX, windowY){
	var canvasBoundingRect = this._canvas.getBoundingClientRect();
	return new Point(
		windowX - canvasBoundingRect.left,
		windowY - canvasBoundingRect.top
	);
};

GraphicsLibrary.prototype.clearCanvas = function(){
	this._ctx.clearRect(0, 0, window.sft.EngineSettings.CANVAS_WIDTH_PX, window.sft.EngineSettings.CANVAS_HEIGHT_PX);
};

/*
	settings = 
		{
			img: new Image(), // HTML Img node
			centerPoint: new Point(10,10), // center point of clipped image that governs placement, default is geometric center
			target: new Point(300, 200), // image rendered such that centerPoint of image aligns with target on canvas
			clippingRect: new BoundingBox( // The clipping rectangle to use to determine which part of the src image to draw, 
				new Point(10,10),		  // defualt is no clipping
				new Point(50,50)
			),
			scale: 1.2 // the factor to scale the image by, default 1.0
		}
*/
GraphicsLibrary.prototype.drawImage = function(settings){
	this._ctx.save();

	var clippingRect = settings.clippingRect ? 
			settings.clippingRect : 
			new BoundingBox(new Point(0,0), new Point(settings.img.width, settings.img.height)),
		imgWidth = clippingRect.bottomRight().x() - clippingRect.topLeft().x(),
		imgHeight = clippingRect.bottomRight().y() - clippingRect.topLeft().y(),
		centerPoint = settings.centerPoint ? settings.centerPoint : new Point(imgWidth / 2, imgHeight / 2),
		scale = settings.scale ? settings.scale : 1.0;
	this._ctx.drawImage(
		settings.img, 
		clippingRect.topLeft().x(), 
		clippingRect.topLeft().y(), 
		imgWidth, 
		imgHeight,
		settings.target.x() - centerPoint.x() * scale,
		settings.target.y() - centerPoint.y() * scale, 
		imgWidth * scale, 
		imgHeight * scale);

	this._ctx.restore();
};

/*
	settings = 
		{
			center: new Point(100,100), // center point of circle
			radius: 10, // radius of circle in px
			lineWidth: 2, // line width of circle
			lineStyle: "#FF0000" // line style of circle
		}
*/
GraphicsLibrary.prototype.drawCircle = function(settings){
	this._ctx.save();

	this._ctx.lineWidth = settings.lineWidth;
	this._ctx.strokeStyle = settings.lineStyle;

	this._ctx.beginPath();
	this._ctx.arc(settings.center.x(), settings.center.y(), settings.radius, 0, 2*Math.PI);
	this._ctx.stroke();

	this._ctx.restore();
};

/*
	settings =
		{
			topLeft: new Point(50,100), // top left point of grid
			width: 100, // grid width in px
			height: 100, // grid height in px
			cols: 10, // number of columns
			rows: 10, // number of rows
			lineWidth: 2, // grid line width in px
			lineStyle: "#FF0000" // grid line style
		}
*/
GraphicsLibrary.prototype.drawGrid = function(settings){
	this._ctx.save();

	var lineEnd = new Point(0,0);
	var colWidth = Math.floor(settings.width / settings.cols);
	var rowWidth = Math.floor(settings.height / settings.rows);

	// Draw grid perimeter
	this.drawRect({
		topLeft: settings.topLeft,
		width: settings.width,
		height: settings.height,
		lineWidth: settings.lineWidth,
		lineStyle: settings.lineStyle
	});

	// Draw column lines
	var lineStart = clone(settings.topLeft);
	lineStart.x(lineStart.x() + colWidth);
	lineEnd.x(lineStart.x());
	lineEnd.y(lineStart.y() + settings.height);
	for(var col = 2; col <= settings.cols; col++){
		this.drawLine({
			start: lineStart,
			end: lineEnd,
			width: settings.lineWidth,
			style: settings.lineStyle
		});

		lineStart.x(lineStart.x() + colWidth);
		lineEnd.x(lineStart.x());
	}

	// Draw row lines
	lineStart = clone(settings.topLeft);
	lineStart.y(lineStart.y() + rowWidth);
	lineEnd.x(lineStart.x() + settings.width);
	lineEnd.y(lineStart.y());
	for(var row = 2; row <= settings.rows; row++){
		this.drawLine({
			start: lineStart,
			end: lineEnd,
			width: settings.lineWidth,
			style: settings.lineStyle
		});

		lineStart.y(lineStart.y() + rowWidth);
		lineEnd.y(lineStart.y());
	}

	this._ctx.restore();
};

/*
	settings = 
		{
			topLeft: new Point(0,0), // top left point of rectangle
			width: 100, // width of rectangle in px
			height: 200, // height of rectangle in px
			lineWidth: 2, // line width in px
			lineStyle: "#FF0000" // rectangle line style
		}
*/
GraphicsLibrary.prototype.drawRect = function(settings){
	this._ctx.save();

	this._ctx.lineWidth = settings.lineWidth;
	this._ctx.strokeStyle = settings.lineStyle;

	this._ctx.beginPath();
	this._ctx.rect(
		settings.topLeft.x(), 
		settings.topLeft.y(), 
		settings.width, 
		settings.height);
	this._ctx.stroke();

	this._ctx.restore();
};

/*
	settings = 
		{
			start: new Point(0,0), // starting point of line
			end: new Point(10,10), // ending point of line
			width: 2, // width of line in px
			style: "#FF0000" // line style
		}
*/
GraphicsLibrary.prototype.drawLine = function(settings){
	this._ctx.save();

	this._ctx.lineWidth = settings.width;
	this._ctx.strokeStyle = settings.style;

	this._ctx.beginPath();
	this._ctx.moveTo(settings.start.x(), settings.start.y());
	this._ctx.lineTo(settings.end.x(), settings.end.y());
	this._ctx.stroke();

	this._ctx.restore();
};

module.exports = GraphicsLibrary;