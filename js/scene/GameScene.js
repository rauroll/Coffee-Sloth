var airResistance = -0.01;
var gravity = 0.15;
var backgroundVelocity = 0.1;

function GameScene() {
	this.name = 'game';
	this.scene = new PIXI.DisplayObjectContainer();

	var sectionA = new Section(205);
	sectionA.getContainer = function () {
		var container = new PIXI.DisplayObjectContainer();
		var g = new PIXI.Graphics();
		g.beginFill(0x000000);
		g.drawRect(40, 40, 50, 100);
		return container.addChild(g);
	}

	var sectionManager = new SectionManager(SceneManager.renderer.width, SceneManager.renderer.height, [
		sectionA
	]);

	var sloth = new Sloth();
	var overlay = new GameOverOverlay();
	var coffeeBar = new CoffeeBar();
	var distance = new Distance(SceneManager.renderer.width, SceneManager.renderer.height);

	var backgroundContainer = null;
	var throttleKeyAction = new KeyAction([38], 
		function () { sloth.accelerate(true); }, 
		function () { sloth.accelerate(false); }
	);
	var gameIsOver = false;
	var t = this;
	var coffees;
	var enemies;

	this.keyboardManager = new KeyboardInputManager([
		new KeyAction([37, 39], 
			function (code) { sloth.startRotation(code === 39 ? 'right' : 'left'); }, 
			function () { sloth.stopRotation(); }
		),
		new KeyAction([27], null, function () {
			SceneManager.changeScene('main');
		}),
		new KeyAction([13], null, function () {
			if(gameIsOver)
				t.newGame();
		})
	]);

	this.update = function () {

		sloth.update(throttleKeyAction.active);

		far.tilePosition.x -= backgroundVelocity * sloth.velocity.x;
		mid.tilePosition.x = far.tilePosition.x / 0.3;
		floor.tilePosition.x = far.tilePosition.x / 0.2

		coffees.update(backgroundVelocity * sloth.velocity.x / 0.2);
		enemies.update(backgroundVelocity * sloth.velocity.x / 0.2);

		if(!gameIsOver && (coffeeBar.isEmpty() || sloth.collidesWith(undefined, 470) || sloth.collidesWith(undefined, 0)))
			gameOver();
		else
			coffeeBar.decrease(0.001);

		sectionManager.update(sloth.velocity);
		if(!gameIsOver)
			distance.update(sloth.velocity.x);
	};

	this.init = function () {
		AudioManager.theme.play();
		
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
		this.scene.addChild(sectionManager.container);
		this.scene.addChild(sloth.displayObject);
		this.scene.addChild(coffeeBar.container);
		this.scene.addChild(distance.container)
		this.scene.addChild(coffees);
		this.scene.addChild(enemies);
		this.scene.addChild(overlay.displayObject);
		this.scene.addChild(backArrow);
	};
	this.attach = function () {
		this.newGame();
	};
	var gameOver = function () {
		gameIsOver = true;
		overlay.show();
		throttleKeyAction.enabled = false;
		throttleKeyAction.onKeyUp();
		coffeeBar.hide();
	};
	this.newGame = function () {
		coffeeBar.fill();
		gameIsOver = false;
		overlay.hide();
		throttleKeyAction.enabled = true;
		coffeeBar.show();

		sloth.init();
		distance.init();
	};
};

CScene.extendWith(GameScene);

