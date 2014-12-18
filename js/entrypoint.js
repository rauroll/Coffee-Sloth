$(document).ready(function () {
	$('.game-wrapper').append(SceneManager.init());

	SceneManager.createScene(new LoaderScene());
	SceneManager.createScene(new MainScene());
	SceneManager.createScene(new GameScene());
	SceneManager.initScenes();

	SceneManager.changeScene('loader');

	$(window).trigger('rendererReady');
});