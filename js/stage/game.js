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
	onFrame: function () {

		this.velocity.x += this.acceleration * Math.sin(sloth.rotation + 1) + airResistance * this.velocity.x;
		this.velocity.y -= this.acceleration * Math.cos(sloth.rotation + 1) - gravity - airResistance * this.velocity.y;
		far.tilePosition.x -= backgroundVelocity * this.velocity.x;
		mid.tilePosition.x = far.tilePosition.x / 0.2;

		sloth.position.y += this.velocity.y;

		sloth.rotation += this.rotationVelocity / 200;

		if(this.removeRotationBoost && this.rotationVelocity !== 0)
			this.rotationVelocity += this.rotationVelocity > 0 ? -0.5 : 0.5;

		if(coffeeBarInside.scale.x > 0)
			coffeeBarInside.scale.x -= 0.001;
		else
			this.gameOver()
	},
	init: function () {
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
	},
	addOverlayFilter: function () {
		var blurFilter = new PIXI.BlurFilter();
		blurFilter.blur = 20;
		this.backgroundContainer.filters = [new PIXI.GrayFilter(), blurFilter];
		sloth.filters = this.backgroundContainer.filters;
	},
	removeOverlayFilter: function () {
		this.backgroundContainer.filters = null;
		sloth.filters = null;
	},
	boostCoffeeLevel: function (amount) {
		amount = amount || 0.2;
		coffeeBarInside.scale.x = Math.min(1, coffeeBarInside.scale.x + amount);
	},
	gameOver: function () {
		this.addOverlayFilter();
		this.keyboardManager.actions[0].enabled = false;
	}
};

$(window).on('rendererReady', function () {
	gameStage.init();
});