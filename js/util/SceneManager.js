var SceneManager = {
	renderer: null,
	scenes: {},
	stage: null,
	currentScene: null,
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
		this.stage.addChild(this.currentScene.scene);

		this.currentScene.attach();
	},
	init: function () {
		this.renderer = PIXI.autoDetectRenderer(960, 480);
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
	},
	initScenes: function () {
		for(p in this.scenes)
			this.scenes[p].init();
	}
};