var gameStage = new PIXI.Stage(0x66FF55);

var sloth = new PIXI.Graphics();
sloth.beginFill(0x000000);
sloth.moveTo(0, 50);
sloth.lineTo(40, 50);
sloth.lineTo(20, 0);
sloth.lineTo(0, 50);
sloth.position.set(100, 200);
sloth.pivot.set(20, 25);
gameStage.addChild(sloth);

var rotationCache = 0;
var gravity = 5;

var removeVelBoost = false;
var velBoost = 0;

var removeRotationBoost = false;
var rotationBoost = 0;

gameStage.onFrame = function () {
	sloth.position.x += velBoost * Math.sin(rotationCache);
	sloth.position.y += gravity - velBoost * Math.cos(rotationCache);
	sloth.rotation += rotationBoost / 200;

	if(removeVelBoost) {
		if(velBoost > 0)
			velBoost -= 0.1;
		else if(velBoost < 0)
			velBoost = 0;
	}

	if(removeRotationBoost) {
		if(rotationBoost > 0)
			rotationBoost -= 0.5;
		else if(rotationBoost < 0)
			rotationBoost += 0.5;
	}
};

var keyboardManager = new KeyboardInputManager([
	new KeyAction([38], function () {
		if(!this.interval) {
			velBoost = 5;
			rotationCache = sloth.rotation;
			removeVelBoost = false;
			this.interval = setInterval(function () {
				velBoost += 0.3;
			}, 10);
		}
	}, function () {
		removeVelBoost = true;
		clearInterval(this.interval);
		this.interval = false;
	}),
	new KeyAction([37, 39], function (code) {
		if(!this.interval) {
			rotationBoost = code === 39 ? 8 : -8;
			removeRotationBoost = false;
			this.interval = setInterval(function () {
				rotationBoost *= 1.1;
			}, 50);
		}
	}, function () {
		removeRotationBoost = true;
		clearInterval(this.interval);
		this.interval = false;
	})
]);

gameStage.keyDown = function (code) { keyboardManager.onKeyDown(code); };
gameStage.keyUp = function (code) { keyboardManager.onKeyUp(code); };