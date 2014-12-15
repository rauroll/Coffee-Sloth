var rotationStep = 8;
var gravity = 0.15;
var backgroundVelocity = 0.1;

var gameStage = {
	stage: new PIXI.Stage(),
	acceleration: 0,
	velocity: new PIXI.Point(0, 0),
	removeRotationBoost: false,
	rotationVelocity: 0,
	keyboardManager: null,

	onFrame:  function () {
		this.velocity.x += this.acceleration * Math.sin(sloth.rotation);
		this.velocity.y -= this.acceleration * Math.cos(sloth.rotation) - gravity;
		far.tilePosition.x -= backgroundVelocity * this.velocity.x;
		mid.tilePosition.x = far.tilePosition.x / 0.2;

		sloth.position.y += this.velocity.y;

		sloth.rotation += this.rotationVelocity / 200;

		if(this.removeRotationBoost && this.rotationVelocity !== 0)
			this.rotationVelocity += this.rotationVelocity > 0 ? -0.5 : 0.5;
	},
	init: function () {
		var t = this;

		var backArrow = new PIXI.Sprite.fromImage('asset/image/back.png');
		backArrow.position.set(12, 12);
		backArrow.alpha = 0.5;
		backArrow.interactive = true;
		backArrow.click = function () {
			setStage(mainStage);
		};
		backArrow.mouseover = function () { backArrow.alpha = 1; };
		backArrow.mouseout = function () { backArrow.alpha = 0.5; };

		this.stage.addChild(far);
		this.stage.addChild(mid);
		this.stage.addChild(sloth);
		this.stage.addChild(backArrow);

		this.keyboardManager = new KeyboardInputManager([
			new KeyAction([38], function () {
				t.acceleration = 0.6;
			}, function () {
				t.acceleration = 0;
			}),
			new KeyAction([37, 39], function (code) {
				t.rotationVelocity = code === 39 ? rotationStep : -rotationStep;
				t.removeRotationBoost = false;
				t.interval = setInterval(function () {
					t.rotationVelocity *= 1.1;
				}, 50);
			}, function () {
				t.removeRotationBoost = true;
				clearInterval(t.interval);
				t.interval = false;
			}),
			new KeyAction([27], function () {
				setStage(mainStage);
			})
		]);
	}
};