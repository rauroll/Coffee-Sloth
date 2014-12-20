var airResistance = -0.02;
var gravity = 0.1;

function GameScene() {
	var t = this;
	var gameIsOver = false;

	this.name = 'game';
	this.scene = new PIXI.DisplayObjectContainer();

	// sections
	var coffeeSection = new CoffeeSection(205);

	var sectionManager = new SectionManager(SceneManager.renderer.width, SceneManager.renderer.height, [
		coffeeSection
	]);

	// display elements
	var sloth = new Sloth();
	var backgrounds = new Backgrounds();
	var overlay = new GameOverOverlay();
	var coffeeBar = new CoffeeBar();
	var distance = new Distance(SceneManager.renderer.width, SceneManager.renderer.height);

	// key actionds
	var throttleKeyAction = new KeyAction([38], 
		function () { sloth.accelerate(true); }, 
		function () { sloth.accelerate(false); }
	);

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

	// methods

	this.update = function () {
		sloth.update(throttleKeyAction.active);
		backgrounds.update(sloth.velocity);
		sectionManager.update(sloth.velocity);

		if(!gameIsOver && (coffeeBar.isEmpty() || sloth.collidesWith(undefined, SceneManager.renderer.height) || sloth.collidesWith(undefined, 0)))
			gameOver();
		else
			coffeeBar.decrease(0.001);

		if(!gameIsOver)
			distance.update(sloth.velocity.x);

		if (!gameIsOver) {

			// Check for coffees and drink them!
			for (var i = 0; i < sectionManager.sectionQueue.length; i++) {
				var section = sectionManager.sectionQueue[i];
				for (var j = 0; j < section.objects.length; j++) {
					var obj = section.objects[j];
					if (sloth.collidesWithRect(obj.sprite)) {
						coffeeBar.increase();
						section.container.removeChildAt(j);
						section.objects.splice(j, 1);
						j--;
					}
				}
			}
		}
	};

	this.init = function () {
		AudioManager.theme.play();
		
		this.keyboardManager.add(throttleKeyAction);

		var backArrow = new PIXI.Sprite.fromImage('asset/image/back.png');
		backArrow.position.set(12, 12);
		backArrow.alpha = 0.5;
		backArrow.interactive = true;
		backArrow.click = function () { SceneManager.changeScene('main'); };
		backArrow.mouseover = function () { backArrow.alpha = 1; };
		backArrow.mouseout = function () { backArrow.alpha = 0.6; };

		this.scene.addChild(backgrounds.container);
		this.scene.addChild(sectionManager.container);
		this.scene.addChild(sloth.displayObject);
		this.scene.addChild(coffeeBar.container);
		this.scene.addChild(overlay.displayObject);
		this.scene.addChild(distance.container)
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
		gameIsOver = false;
		overlay.hide();
		coffeeBar.show();
		coffeeBar.fill();
		throttleKeyAction.enabled = true;

		sectionManager.reset()
		sloth.init();
		distance.init();
	};
};

CScene.extendWith(GameScene);