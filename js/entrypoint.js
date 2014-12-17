$(document).ready(function () {
	$('.game-wrapper').append(SceneManager.init());

	SceneManager.createScene(new LoaderScene());
	SceneManager.createScene(new MainScene());
	SceneManager.createScene(new GameScene());
	SceneManager.initScenes();

	SceneManager.changeScene('loader');

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
	this.position.set(SceneManager.renderer.width / 2, SceneManager.renderer.height / 2);
};