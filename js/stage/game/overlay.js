var overlay = new PIXI.DisplayObjectContainer();

$(window).on('rendererReady', function () {
	var background = new PIXI.Graphics();
	background.beginFill(0x000000, 0.9);
	background.drawRect(0, 0, renderer.width, renderer.height);
	
	var container = new PIXI.DisplayObjectContainer();	
	var gameOverLabel = new PIXI.Text('Game Over!', {
		font: 'bold 60px Arial',
		fill: '#ffffff'
	});
	
	var newGameLabel = new InteractiveText('Play Again', 30, function () {
		gameStage.newGame();
	});
	newGameLabel.position.set(gameOverLabel.width / 2 - newGameLabel.width / 2, 80);

	container.addChild(gameOverLabel);
	container.addChild(newGameLabel);
	container.center();

	overlay.addChild(background);
	overlay.addChild(container);
	overlay.visible = false;
});