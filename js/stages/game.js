var gameStage = new PIXI.Stage(0x66FF55);

var sloth = new PIXI.Graphics();
var farTexture = PIXI.Texture.fromImage("assets/img/bg-far.png");
var far = new PIXI.TilingSprite(farTexture, 960, 480);
var midTexture = PIXI.Texture.fromImage("assets/img/bg-mid.png");
var mid = new PIXI.TilingSprite(midTexture, 960, 480);
far.tilePosition.x = 0;
far.tilePosition.y = 0;
mid.tilePosition.x = 0;
mid.tilePosition.y = 0;
gameStage.addChild(far);
gameStage.addChild(mid);



sloth.beginFill(0x000000);
sloth.moveTo(0, 50);
sloth.lineTo(40, 50);
sloth.lineTo(20, 0);
sloth.lineTo(0, 50);
sloth.position.set(100, 200);
sloth.pivot.set(20, 25);
gameStage.addChild(sloth);

var rotationCache = 0;
var gravity = 0.2;

var removeAccel = false;
var accel = 0;
var accelx = 0;
var accely = 0;
var velx = 0;
var vely = 0;

var removeRotationBoost = false;
var rotationBoost = 0;




gameStage.onFrame = function () {
	velx += accelx
	vely += -accely * Math.cos(rotationCache) + gravity
	far.tilePosition.x -= 0.128 * velx ;
	mid.tilePosition.x -= 0.64 * velx;
	sloth.position.x += velBoost * Math.sin(rotationCache);
	if (sloth.position.y < 460) {
		sloth.position.y += vely;
	}
	sloth.rotation += rotationBoost / 200;

	if(removeAccel) {
		// Not accelerating, start slowing down slowly

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
			if (accel < 0.5) {
				accel = 4;
			}
			rotationCache = sloth.rotation;
			removeAccel = false;
			//this.interval = setInterval(function () {
			//	accel += 0.3;
			//}, 10);
		}
	}, function () {
		removeAccel = true;
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