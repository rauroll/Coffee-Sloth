var airResistance = -0.01;
var gravity = 0.1;

function GameScene() {
	var t = this;
	var gameIsOver = false;

	this.name = 'game';
	this.scene = new PIXI.DisplayObjectContainer();

	// display elements
	var sloth = new Sloth();
	var backgrounds = new Backgrounds();
	var overlay = new GameOverOverlay();
	var coffeeBar = new CoffeeBar();
	var distance = new Distance(SceneManager.renderer.width, SceneManager.renderer.height);

	// sections
	sectionManager = new SectionManager(viewportWidth, viewportHeight, sloth.displayObject, [
		CoffeeSection,
		FlipSection,
		HorizontalBarSection
	]);

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

	$(sloth).on('loop', function(e, loops) {
		if (Math.abs(loops) > 0.8)
			AudioManager.flip.play();
	});

	// methods

	this.update = function () {
		if(!gameIsOver && sloth.collidesWith(undefined, SceneManager.renderer.height))
			this.gameOver();
		else
			coffeeBar.decrease(0.001);

		throttleKeyAction.enabled = !coffeeBar.isEmpty();

		if(!gameIsOver) {
			distance.update(sloth.velocity.x);
			sloth.update(throttleKeyAction.active);
			backgrounds.update(sloth.velocity);
			sectionManager.update(sloth.velocity);
		}

		if (!gameIsOver) {

			// Check for coffees and drink them!
			for (var i = 0; i < sectionManager.sectionQueue.length; i++) {
				var section = sectionManager.sectionQueue[i];

				// Process collision check for sections

				section.checkForCollisionsWith(sloth);

			}
		}
	};

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
	
	this.attach = function () {
		this.newGame();
		AudioManager.setThemeVolume(50);
	};
	this.gameOver = function () {
		gameIsOver = true;
		overlay.show();
		throttleKeyAction.enabled = false;
		throttleKeyAction.onKeyUp();
		coffeeBar.hide();
		AudioManager.death.play();
	};
	this.newGame = function () {
		overlay.hide();
		coffeeBar.show();
		coffeeBar.fill();
		throttleKeyAction.enabled = true;

		sloth.init();
		distance.init();
		sectionManager.reset();
		gameIsOver = false;
	};

	this.getCoffeeBar = function() {
		return coffeeBar;
	}

	this.getSloth = function () {
		return sloth;
	}
};

CScene.extendWith(GameScene);