(function(oCanvas, window, document, undefined){

	// Define the class
	var irregularpolygon = function (settings, thecore) {

		// Return an object when instantiated
		return oCanvas.extend({
			core: thecore,

			shapeType: "radial",
			sides: [],
			clipChildren: false,

			_: oCanvas.extend({}, thecore.displayObject._),

			draw: function () {
				var canvas = this.core.canvas,
					origin = this.getOrigin(),
					x = this.abs_x - origin.x,
					y = this.abs_y - origin.y,
					firstPoint = { x: 0, y: 0 },
					sides = this.sides,
					last = sides.length - 1,
					xPos, yPos, i;

				canvas.beginPath();

				for (i = 0; i <= last; i++) {

					xPos = x + sides[i].x;
					yPos = y + sides[i].y;

					if (i === 0) { // First
						canvas.moveTo(xPos, yPos);
						firstPoint = { x: xPos, y: yPos };
					} else
					if (i == sides) { // Last
						canvas.lineTo(firstPoint.x, firstPoint.y);
					} else { // Everything in between
						canvas.lineTo(xPos, yPos);
					}
				}

				canvas.closePath();

				if (this.fill !== "") {
					canvas.fillStyle = this.fill;
					canvas.fill();
				}


				if (this.strokeWidth > 0) {
					canvas.lineWidth = this.strokeWidth;
					canvas.strokeStyle = this.strokeColor;
					canvas.stroke();
				}

				// Do clip
				if(this.clipChildren) {
					canvas.clip();
				}

				return this;
			}

		}, settings);
	};

	// Register the display object
	oCanvas.registerDisplayObject("irregularpolygon", irregularpolygon);

})(oCanvas, window, document);