$(document).ready(function () {
	$('.game-wrapper').append(StageManager.init());

	StageManager.createStage(new LoaderStage());
	StageManager.createStage(new MainStage());
	StageManager.createStage(new GameStage());


	StageManager.changeStage('loader');
	StageManager.initStages();

	$(window).trigger('rendererReady');
});

PIXI.Stage.prototype.hasChild = function (child) {
	for (var i = 0; i < this.children.length; i++) {
		if(child === this.children[i])
			return true;
	}
	return false;
};

PIXI.DisplayObjectContainer.prototype.center = function () {
	this.pivot.set(this.width / 2, this.height / 2);
	this.position.set(StageManager.renderer.width / 2, StageManager.renderer.height / 2);
};