var rotationStep = 8;
var gravity = 0.15;
var backgroundVelocity = 0.128;

var gameStage = new PIXI.Stage();

gameStage.addChild(far);
gameStage.addChild(mid);
gameStage.addChild(sloth);

var acceleration = 0;
var velocity = new PIXI.Point(0, 0);

var rotation = 0;
var removeRotationBoost = false;
var rotationVelocity = 0;

gameStage.onFrame = function () {
	velocity.x += acceleration * Math.sin(rotation);
	velocity.y -= acceleration * Math.cos(rotation) - gravity;
	far.tilePosition.x -= backgroundVelocity * velocity.x;
	mid.tilePosition.x = far.tilePosition.x / 0.2;

	sloth.position.y += velocity.y;

	sloth.rotation += rotationVelocity / 200;

	if(removeRotationBoost) {
		if(rotationVelocity > 0)
			rotationVelocity -= 0.5;
		else if(rotationVelocity < 0)
			rotationVelocity += 0.5;
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
		rotationVelocity = code === 39 ? rotationStep : -rotationStep;
		removeRotationBoost = false;
		this.interval = setInterval(function () {
			rotationVelocity *= 1.1;
		}, 50);
	}, function () {
		removeRotationBoost = true;
		clearInterval(this.interval);
		this.interval = false;
	})
]);

gameStage.keyDown = function (code) { keyboardManager.onKeyDown(code); };
gameStage.keyUp = function (code) { keyboardManager.onKeyUp(code); };