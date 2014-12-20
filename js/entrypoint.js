var viewportWidth = 1280;
var viewportHeight = 720;
$(document).ready(function () {
	$('.game-wrapper').append(SceneManager.init());

	SceneManager.createScene(new LoaderScene());
	SceneManager.createScene(new MainScene());
	SceneManager.createScene(new GameScene());

	SceneManager.changeScene('loader');

	SceneManager.addTopLevelChild(new MuteButton());

	$(window).trigger('rendererReady');
});