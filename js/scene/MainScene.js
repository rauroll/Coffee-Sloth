
// Main scene, the main view that is shown to the player once the assets have been loaded.

function MainScene() {
	this.name = 'main';
	this.scene = new PIXI.DisplayObjectContainer();

	var bg = PIXI.Sprite.fromImage('asset/image/main-background.jpg');
	var blurFilter = new PIXI.BlurFilter();
	var logo;
	var newGameLabel = new InteractiveText('New Game', 60, function () {
		SceneManager.changeScene('game');
	});
	var i = 0;

	this.update = function () {
		i += 0.1;
		logo.scale.x *= Math.sin(i) * 0.001 + 1;
		logo.scale.y = logo.scale.x;
		if(i >= Math.PI * 2)
			i = 0;
	};

	this.attach = function () {
		AudioManager.setThemeVolume(80);
	};

	// background
	blurFilter.blur = 20;
	bg.filters = [blurFilter];

	// coffee sloth label
	logo = PIXI.Sprite.fromImage('asset/image/logo.png');
	logo.center();
	logo.pivot.set(700 / 2, 200 / 2);

	// new game label
	newGameLabel.center();
	newGameLabel.position.y += 150;

	this.scene.addChild(bg);
	this.scene.addChild(logo);
	this.scene.addChild(newGameLabel);

	this.keyboardManager = new KeyboardInputManager([
		new KeyAction([13], null, function () {
			newGameLabel.click();
		})
	]);
};

CScene.extendWith(MainScene);