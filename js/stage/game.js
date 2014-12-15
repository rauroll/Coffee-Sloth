var rotationStep = 8;
var airResistance = -0.01;
var gravity = 0.15;
var backgroundVelocity = 0.1;

var gameStage = {
	stage: new PIXI.Stage(),
	acceleration: 0,
	velocity: new PIXI.Point(0, 0),
	removeRotationBoost: false,
	rotationVelocity: 0,
	keyboardManager: new KeyboardInputManager([
		new KeyAction([38], function () {
			gameStage.acceleration = 0.6;
		}, function () {
			gameStage.acceleration = 0;
		}),
		new KeyAction([37, 39], function (code) {
			gameStage.rotationVelocity = code === 39 ? rotationStep : -rotationStep;
			gameStage.removeRotationBoost = false;
			gameStage.interval = setInterval(function () {
				gameStage.rotationVelocity *= 1.1;
			}, 50);
		}, function () {
			gameStage.removeRotationBoost = true;
			clearInterval(gameStage.interval);
			gameStage.interval = false;
		}),
		new KeyAction([27], function () {
			setStage(mainStage);
		})
	]),
	onFrame:  function () {
		this.velocity.x += this.acceleration * Math.sin(sloth.rotation) + airResistance * this.velocity.x;
		this.velocity.y -= this.acceleration * Math.cos(sloth.rotation) - gravity - airResistance * this.velocity.y;
		far.tilePosition.x -= backgroundVelocity * this.velocity.x;
		mid.tilePosition.x = far.tilePosition.x / 0.2;

		sloth.position.y += this.velocity.y;

		sloth.rotation += this.rotationVelocity / 200;

		if(this.removeRotationBoost && this.rotationVelocity !== 0)
			this.rotationVelocity += this.rotationVelocity > 0 ? -0.5 : 0.5;
	},
	init: function () {
		var backArrow = new PIXI.Sprite.fromImage('asset/image/back.png');
		backArrow.position.set(12, 12);
		backArrow.alpha = 0.5;
		backArrow.interactive = true;
		backArrow.click = function () { setStage(mainStage); };
		backArrow.mouseover = function () { backArrow.alpha = 1; };
		backArrow.mouseout = function () { backArrow.alpha = 0.5; };

		this.stage.addChild(far);
		this.stage.addChild(mid);
		this.stage.addChild(sloth);
		this.stage.addChild(backArrow);
	}
};