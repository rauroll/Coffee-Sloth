/*

The game scene, which contains the actual game itself.

 */

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
	this.sectionManager = new SectionManager(viewportWidth, viewportHeight, sloth.displayObject, [
		CoffeeSection,
		FlipSection,
		HorizontalBarSection,
		EnemySection,
		RandomEmptySection
	]);

	// key actions
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
			AudioManager.play('flip');
	});

	// methods

	this.update = function () {
		if(!this.gameIsOver() && sloth.collidesWith(undefined, SceneManager.renderer.height))
			this.gameOver();
		else
			coffeeBar.decrease(0.001);

		throttleKeyAction.enabled = !coffeeBar.isEmpty();
		if (throttleKeyAction.active && coffeeBar.isEmpty()) {
			throttleKeyAction.onKeyUp();
			throttleKeyAction.active = false;
		}

		if(!this.gameIsOver()) {
			sloth.update(throttleKeyAction.active);
			backgrounds.update(sloth.velocity);
			this.sectionManager.update(sloth.velocity);
			distance.update(sloth.velocity.x);
		} else {
			distance.update(0);
		}

		if (!this.gameIsOver()) {

			for (var i = 0; i < this.sectionManager.sectionQueue.length; i++) {
				var section = this.sectionManager.sectionQueue[i];

				// Check for collisions and react to them properly and as defined for the particular section in question.

				section.checkForCollisionsWith(sloth);

			}
		}
	};

	AudioManager.playTheme();
	
	this.keyboardManager.add(throttleKeyAction);

	var backArrow = new PIXI.Sprite.fromImage('asset/image/back.png');
	backArrow.position.set(12, 12);
	backArrow.alpha = 0.5;
	backArrow.interactive = true;
	backArrow.click = function () { SceneManager.changeScene('main'); };
	backArrow.mouseover = function () { backArrow.alpha = 1; };
	backArrow.mouseout = function () { backArrow.alpha = 0.6; };

	this.scene.addChild(backgrounds.container);
	this.scene.addChild(this.sectionManager.container);
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
		AudioManager.play('death');
		distance.showScoreLabel(true);
	};
	this.gameIsOver = function () {
		return gameIsOver;
	};
	this.newGame = function () {
		overlay.hide();
		coffeeBar.show();
		coffeeBar.fill();
		throttleKeyAction.enabled = true;

		sloth.init();
		distance.init();
		this.sectionManager.reset();
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