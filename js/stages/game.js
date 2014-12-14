var gameStage = new PIXI.Stage();

gameStage.addChild(far);
gameStage.addChild(mid);
gameStage.addChild(sloth);

var gravity = 0.15;

var acceleration = 0;
var velocity = new PIXI.Point(0, 0);

var rotation = 0;
var removeRotationBoost = false;
var rotationStep = 0;

gameStage.onFrame = function () {
	velocity.x += acceleration * Math.sin(rotation);
	velocity.y -= acceleration * Math.cos(rotation) - gravity;
	far.tilePosition.x -= 0.128 * velocity.x;
	mid.tilePosition.x -= 0.64 * velocity.x;

	sloth.position.y += velocity.y;

	sloth.rotation += rotationStep / 200;

	if(removeRotationBoost) {
		if(rotationStep > 0)
			rotationStep -= 0.5;
		else if(rotationStep < 0)
			rotationStep += 0.5;
	}
};

var keyboardManager = new KeyboardInputManager([
	new KeyAction([38], function () {
		acceleration = 0.6;
		rotation = sloth.rotation;
	}, function () {
		acceleration = 0;
	}),
	new KeyAction([37, 39], function (code) {
		rotationStep = code === 39 ? 8 : -8;
		removeRotationBoost = false;
		this.interval = setInterval(function () {
			rotationStep *= 1.1;
		}, 50);
	}, function () {
		removeRotationBoost = true;
		clearInterval(this.interval);
		this.interval = false;
	})
]);

gameStage.keyDown = function (code) { keyboardManager.onKeyDown(code); };
gameStage.keyUp = function (code) { keyboardManager.onKeyUp(code); };