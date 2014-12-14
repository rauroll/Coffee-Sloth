var renderer;
var currentStage;
$(document).ready(function () {
	renderer = PIXI.autoDetectRenderer(960, 500);
	$('.game-wrapper').append(renderer.view);

	currentStage = mainStage;

	requestAnimFrame(animate);
	function animate() {
		requestAnimFrame(animate);
		currentStage.onFrame();
		renderer.render(currentStage);
	}

	$(document).on('keydown', function (e) {
		if (currentStage.keyDown)
			currentStage.keyDown(e.keyCode);
	});

	$(document).on('keyup', function (e) {
		if (currentStage.keyUp)
			currentStage.keyUp(e.keyCode);
	});
});