
// Shown to the player when the game is over.

function GameOverOverlay() {
	this.displayObject = new PIXI.DisplayObjectContainer();
	var background = new PIXI.Graphics();
	background.beginFill(0x000000, 0.7);
	background.drawRect(0, 0, SceneManager.renderer.width, SceneManager.renderer.height);
	
	var container = new PIXI.DisplayObjectContainer();	
	var gameOverLabel = new PIXI.Text('Game Over!', {
		font: 'bold 60px Arial',
		fill: '#ffffff'
	});
	
	var newGameLabel = new InteractiveText('Play Again', 30, function () {
		SceneManager.getScene('game').newGame();
	});
	newGameLabel.position.set(gameOverLabel.width / 2 - newGameLabel.width / 2, 80);

	container.addChild(gameOverLabel);
	container.addChild(newGameLabel);
	container.center();

	this.displayObject.addChild(background);
	this.displayObject.addChild(container);
	this.displayObject.visible = false;
	
	this.show = function () {
		this.displayObject.visible = true;
	};
	this.hide = function () {
		this.displayObject.visible = false;
	};
};