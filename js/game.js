var renderer;
$(document).ready(function () {
	renderer = PIXI.autoDetectRenderer(960, 500);
	$('.game-wrapper').append(renderer.view);
});