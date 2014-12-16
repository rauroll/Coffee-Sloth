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
	backgroundContainer: null,
	throttleKeyAction: new KeyAction([38], function () {
		gameStage.acceleration = 0.6;
	}, function () {
		gameStage.acceleration = 0;
	}),
	keyboardManager: new KeyboardInputManager([
		new KeyAction([37, 39], function (code) {
			gameStage.rotationVelocity = code === 39 ? rotationStep : -rotationStep;
			gameStage.removeRotationBoost = false;
			gameStage.interval = setInterval(function () {
				gameStage.rotationVelocity *= 1.07;
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
	slothFrameIndex: 1,
	slothFrameOffset: 0,
	onFrame: function () {
		if (this.throttleKeyAction.active) {
			if (this.slothFrameOffset > 3) {
				this.slothFrameIndex = this.slothFrameIndex % 4 + 1;
				this.slothFrameOffset = 0;
			}
			sloth.setTexture(PIXI.Texture.fromImage('asset/image/sloth/slothsprite' + this.slothFrameIndex + '.png'));
			this.slothFrameOffset++;
		}
		else
			sloth.setTexture(PIXI.Texture.fromImage('asset/image/sloth/slothsprite_nofire.png'));

		this.velocity.x += this.acceleration * Math.sin(sloth.rotation + 1) + airResistance * this.velocity.x;
		this.velocity.y -= this.acceleration * Math.cos(sloth.rotation + 1) - gravity - airResistance * this.velocity.y;
		far.tilePosition.x -= backgroundVelocity * this.velocity.x;
		mid.tilePosition.x = far.tilePosition.x / 0.2;

		sloth.position.y += this.velocity.y;

		sloth.rotation += this.rotationVelocity / 200;

		if(this.removeRotationBoost && this.rotationVelocity !== 0)
			this.rotationVelocity += this.rotationVelocity > 0 ? -0.5 : 0.5;

		if(coffeeBarInside.scale.x > 0)
			coffeeBarInside.scale.x -= 0.01;
		else
			this.gameOver();
	},
	init: function () {
		this.keyboardManager.add(this.throttleKeyAction);

		var backArrow = new PIXI.Sprite.fromImage('asset/image/back.png');
		backArrow.position.set(12, 12);
		backArrow.alpha = 0.5;
		backArrow.interactive = true;
		backArrow.click = function () { setStage(mainStage); };
		backArrow.mouseover = function () { backArrow.alpha = 1; };
		backArrow.mouseout = function () { backArrow.alpha = 0.5; };

		this.backgroundContainer = new PIXI.DisplayObjectContainer();
		this.backgroundContainer.addChild(far);
		this.backgroundContainer.addChild(mid);
		this.stage.addChild(this.backgroundContainer);

		this.stage.addChild(sloth);
		this.stage.addChild(coffeeBar);
		this.stage.addChild(backArrow);
		this.stage.addChild(overlay);
	},
	boostCoffeeLevel: function (amount) {
		amount = amount || 0.2;
		coffeeBarInside.scale.x = Math.min(1, coffeeBarInside.scale.x + amount);
	},
	gameOver: function () {
		overlay.visible = true;
		this.throttleKeyAction.enabled = false;
		this.throttleKeyAction.onKeyUp();
		coffeeBar.visible = false;
	},
	newGame: function () {
		overlay.visible = false;
		this.throttleKeyAction.enabled = true;
		coffeeBar.visible = true;
	}
};

$(window).on('rendererReady', function () {
	gameStage.init();
});