function CoffeeBar() {
	var width = 300;
	var height = 30;

	this.container = new PIXI.DisplayObjectContainer();

	var inside = new PIXI.Graphics();
	inside.beginFill(0xFFFFFF, 0.8);
	inside.drawRect(0, 0, width, width / 10);
	inside.scale.x = 1;
	this.container.addChild(inside);

	var outline = new PIXI.Graphics();
	outline.lineStyle(2, 0xFFFFFF, 0.8);
	outline.drawRect(0, 0, width, width / 10);
	this.container.addChild(outline);

	this.container.position.set(SceneManager.renderer.width / 2 - width / 2, height);

	this.show = function () {
		this.container.visible = true;
	};

	this.hide = function () {
		this.container.visible = false;
	};

	this.increase = function (amount) {
		amount = amount || 0.2;
		inside.scale.x = Math.min(1, inside.scale.x + amount);
	};

	this.decrease = function (amount) {
		inside.scale.x = Math.max(0, inside.scale.x - amount);
	};

	this.isEmpty = function (amount) {
		return inside.scale.x === 0;
	};

	this.fill = function () {
		inside.scale.x = 1;
	}
};