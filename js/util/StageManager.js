var StageManager = {
	renderer: null,
	stages: {},
	currentStage: null,
	createStage: function (id) {
		
	},
	changeStage: function (id) {
		this.currentStage = id;
	},
	init: function () {
		this.renderer = PIXI.autoDetectRenderer(960, 480);
		requestAnimFrame(StageManager.loop);

		$(document).on('keydown', function (e) {
			if (StageManager.currentStage.keyboardManager)
				StageManager.currentStage.keyboardManager.keyDown(e.keyCode);
		});

		$(document).on('keyup', function (e) {
			if (StageManager.currentStage.keyboardManager)
				StageManager.currentStage.keyboardManager.keyUp(e.keyCode);
		});

		return this.renderer.view;
	},
	loop: function () {
		requestAnimFrame(StageManager.loop);
		var stage = StageManager.currentStage;
		if(stage) {
			if(stage.onFrame)
				stage.onFrame();	
			StageManager.renderer.render(stage.stage);
		}
	}
};