var renderer;
var currentStage;
$(document).ready(function () {
	renderer = PIXI.autoDetectRenderer(960, 480);
	$('.game-wrapper').append(renderer.view);

	setStage(loaderStage);

	requestAnimFrame(animate);
	function animate() {
		requestAnimFrame(animate);
		if(currentStage.onFrame)
			currentStage.onFrame();	
		renderer.render(currentStage.stage);
	}

	$(document).on('keydown', function (e) {
		if (currentStage.keyboardManager)
			currentStage.keyboardManager.keyDown(e.keyCode);
	});

	$(document).on('keyup', function (e) {
		if (currentStage.keyboardManager)
			currentStage.keyboardManager.keyUp(e.keyCode);
	});

	$(window).trigger('rendererReady');
});

function setStage(stage) {
	currentStage = stage;
};

PIXI.Stage.prototype.hasChild = function (child) {
	for (var i = 0; i < this.children.length; i++) {
		if(child === this.children[i])
			return true;
	}
	return false;
};

PIXI.DisplayObjectContainer.prototype.center = function () {
	this.pivot.set(this.width / 2, this.height / 2);
	this.position.set(renderer.width / 2, renderer.height / 2);
};