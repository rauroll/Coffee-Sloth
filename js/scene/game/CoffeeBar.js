function CoffeeBar() {
	var width = 400;
	var height = 15;

	this.container = new PIXI.DisplayObjectContainer();

	var inside = new PIXI.Graphics();
	inside.beginFill(0xFFFFFF);
	inside.drawRect(0, 0, width, height);
	inside.scale.x = 1;
	var colorFilter = new PIXI.ColorMatrixFilter();
	inside.filters = [colorFilter];
	this.container.addChild(inside);

	var outline = new PIXI.Graphics();
	outline.lineStyle(3, 0xFFFFFF);
	outline.drawRect(0, 0, width, height);
	outline.filters = [colorFilter];
	this.container.addChild(outline);

	this.container.position.set(viewportWidth / 2 - width / 2, 10);

	this.show = function () {
		this.container.visible = true;
	};

	this.hide = function () {
		this.container.visible = false;
	};

	this.increase = function (amount) {
		amount = amount || 0.2;
		inside.scale.x = Math.min(1, inside.scale.x + amount);
		updateColor();
	};

	this.decrease = function (amount) {
		inside.scale.x = Math.max(0, inside.scale.x - amount);
		updateColor();
	};

	this.isEmpty = function (amount) {
		return inside.scale.x === 0;
	};

	this.fill = function () {
		inside.scale.x = 1;
		updateColor();
	}

	function updateColor() {
		var s = inside.scale.x;
		colorFilter.matrix = [
			Math.min(1, 2 - 2 * s),0,0,0,
			0,Math.min(1, 2 * s),0,0,
			0,0,0.2,0,
			0,0,0,1
		];
	}
};