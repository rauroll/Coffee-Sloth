var gameStage = new PIXI.Stage(0x66FF55);

var sloth = new PIXI.Graphics();
sloth.beginFill(0x000000);
sloth.drawRect(0, 0, 50, 50);
sloth.position.set(100, 200);
sloth.pivot.set(25, 25);
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

gameStage.keyDown = function (code) {
	switch(code) {
		case 32: // space
			Accelerator.add('velocity', 10, function () {
				velBoost = 5;
				rotationCache = sloth.rotation;
				removeVelBoost = false;
			}, function () {
				velBoost += 0.3;
			});
			break;
		case 39: // right
			Accelerator.add('rotation', 50, function () {
				rotationBoost = 8;
				removeRotationBoost = false;
			}, function () {
				rotationBoost *= 1.1;
			});
			break;
		case 37: // left
			Accelerator.add('rotation', 50, function () {
				rotationBoost = -8;
				removeRotationBoost = false;
			}, function () {
				rotationBoost *= 1.1;
			});
			break;
	}
};

gameStage.keyUp = function (code) {
	if(code === 32) {
		removeVelBoost = true;
		Accelerator.remove('velocity');
	} else if(code === 37 || code === 39) {
		removeRotationBoost = true;
		Accelerator.remove('rotation');
	}
};