/*

The backgrounds, which each move at a different pace to create
an illusion of depth. The background consists of the far, mid and floor components.

 */

function Backgrounds() {
	var backgroundVelocity = 0.1;

	var container = new PIXI.DisplayObjectContainer();

	var farTexture = PIXI.Texture.fromImage("asset/image/bluetheme/bg-far.png");
	var far = new PIXI.TilingSprite(farTexture, 1280, 720);
	var midTexture = PIXI.Texture.fromImage("asset/image/bluetheme/bg-mid.png");
	var mid = new PIXI.TilingSprite(midTexture, 1280, 720);
	far.tilePosition.set(0, 0);
	mid.tilePosition.set(0, 0);
	var floorTexture = PIXI.Texture.fromImage("asset/image/bluetheme/floor.png");
	var floor = new PIXI.TilingSprite(floorTexture, 1280, 50);
	floor.tilePosition.set(0, 0);
	floor.anchor.y = -13.2;

	container.addChild(far);
	container.addChild(mid);
	container.addChild(floor);

	this.update = function (velocity) {
		far.tilePosition.x -= backgroundVelocity * velocity.x;
		mid.tilePosition.x -= backgroundVelocity * velocity.x / 0.3;
		floor.tilePosition.x -= velocity.x;
	};

	this.container = container;
};
