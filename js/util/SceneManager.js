/*

The scene manager is used to control the current scene of the game.

The different scenes, or states, of the game are the game scene, loader scene
and main scene.

 */

var SceneManager = {
	renderer: null,
	scenes: {},
	stage: null,
	currentScene: null,
	addTopLevelChild: function (displayObject) {
		this.stage.addChildAt(displayObject, this.stage.children.length);
	},
	getScene: function (name) {
		return this.scenes[name];
	},
	createScene: function (scene) {
		this.scenes[scene.name] = scene;
	},
	changeScene: function (name) {
		if(this.currentScene) {
			this.currentScene.deattach();
			this.stage.removeChild(this.currentScene.scene);
		}

		this.currentScene = this.scenes[name];
		this.stage.addChildAt(this.currentScene.scene, 0);

		this.currentScene.attach();
	},
	init: function () {
		this.renderer = PIXI.autoDetectRenderer(viewportWidth, viewportHeight);
		this.stage = new PIXI.Stage();
		requestAnimFrame(SceneManager.loop);

		$(document).on('keydown', function (e) {
			if (SceneManager.currentScene.keyboardManager)
				SceneManager.currentScene.keyboardManager.keyDown(e.keyCode);
		});

		$(document).on('keyup', function (e) {
			if (SceneManager.currentScene.keyboardManager)
				SceneManager.currentScene.keyboardManager.keyUp(e.keyCode);
		});

		return this.renderer.view;
	},
	loop: function () {
		requestAnimFrame(SceneManager.loop);

		SceneManager.currentScene.update();
		SceneManager.renderer.render(SceneManager.stage);
	}
};