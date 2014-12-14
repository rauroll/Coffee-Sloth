var renderer;
var currentStage;
$(document).ready(function () {
	renderer = PIXI.autoDetectRenderer(960, 480);
	$('.game-wrapper').append(renderer.view);

	currentStage = mainStage;
	console.log(currentStage)

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