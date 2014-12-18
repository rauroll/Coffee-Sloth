var airResistance = -0.01;
var gravity = 0.15;
var backgroundVelocity = 0.1;

function GameScene() {
	this.name = 'game';
	this.scene = new PIXI.DisplayObjectContainer();

	var sloth = new Sloth();
	var overlay = new GameOverOverlay();

	var backgroundContainer = null;
	var throttleKeyAction = new KeyAction([38], function () {
		sloth.accelerate(true);
	}, function () {
		sloth.accelerate(false);
	});
	var gameIsOver = false;
	var t = this;
	var coffees;
	var enemies;

	this.keyboardManager = new KeyboardInputManager([
		new KeyAction([37, 39], function (code) {
			sloth.startRotation(code === 39 ? 'right' : 'left');
		}, function () {
			sloth.stopRotation();
		}),
		new KeyAction([27], null, function () {
			SceneManager.changeScene('main');
		}),
		new KeyAction([13], null, function () {
			if(gameIsOver)
				t.newGame();
		})
	]);

	this.update = function () {
		if (coffees.length > 0)
			console.log(coffees)

		sloth.update(throttleKeyAction.active);

		far.tilePosition.x -= backgroundVelocity * sloth.velocity.x;
		mid.tilePosition.x = far.tilePosition.x / 0.2;
		floor.tilePosition.x = far.tilePosition.x / 0.1

		coffees.update(backgroundVelocity * sloth.velocity.x / 0.1);
		enemies.update(backgroundVelocity * sloth.velocity.x / 0.1);

		if(coffeeBarInside.scale.x > 0)
			coffeeBarInside.scale.x -= 0.001;
		else if(!gameIsOver)
			gameOver();
	};

	this.init = function () {
		this.keyboardManager.add(throttleKeyAction);

		coffees = new CoffeePool();
		enemies = new EnemyPool();

		var backArrow = new PIXI.Sprite.fromImage('asset/image/back.png');
		backArrow.position.set(12, 12);
		backArrow.alpha = 0.5;
		backArrow.interactive = true;
		backArrow.click = function () { SceneManager.changeScene('main'); };
		backArrow.mouseover = function () { backArrow.alpha = 1; };
		backArrow.mouseout = function () { backArrow.alpha = 0.6; };

		backgroundContainer = new PIXI.DisplayObjectContainer();
		backgroundContainer.addChild(far);
		backgroundContainer.addChild(mid);
		backgroundContainer.addChild(floor);

		this.scene.addChild(backgroundContainer);
		this.scene.addChild(sloth.displayObject);
		this.scene.addChild(coffeeBar);
		this.scene.addChild(coffees);
		this.scene.addChild(enemies);
		this.scene.addChild(overlay.displayObject);
		this.scene.addChild(backArrow);
	};
	this.attach = function () {
		this.newGame();
	};
	var boostCoffeeLevel = function (amount) {
		amount = amount || 0.2;
		coffeeBarInside.scale.x = Math.min(1, coffeeBarInside.scale.x + amount);
	};
	var gameOver = function () {
		gameIsOver = true;
		overlay.show();
		throttleKeyAction.enabled = false;
		throttleKeyAction.onKeyUp();
		coffeeBar.visible = false;
	};
	this.newGame = function () {
		coffeeBarInside.scale.x = 1;
		gameIsOver = false;
		overlay.hide();
		throttleKeyAction.enabled = true;
		coffeeBar.visible = true;

		sloth.init();
	};
};

CScene.extendWith(GameScene);

