var mainStage = new PIXI.Stage();

$(document).ready(function () {
	// background
	var bg = PIXI.Sprite.fromImage('assets/img/main-background.jpg');
	var blurFilter = new PIXI.BlurFilter();
	blurFilter.blur = 30;
	bg.filters = [blurFilter];
	mainStage.addChild(bg);

	// coffee sloth label
	var titleLabel = new PIXI.Text("C O F F E E   S L O T H", {
		font: "bold 40px Arial",
		fill: "#B4824B",
		stroke: '#fff',
		strokeThickness: 2
	});
	var bounds = titleLabel.getBounds();
	titleLabel.position.set(20, 20);
	mainStage.addChild(titleLabel);

	// new game label
	var newGameLabel = new PIXI.Text("New Game", {
		font: "bold 72px Arial",
		fill: "#fff",
		dropShadow: true,
		dropShadowDistance: 1
	});
	newGameLabel.alpha = 0.8;
	newGameLabel.interactive = true;
	var bounds = newGameLabel.getBounds();
	newGameLabel.position.set(renderer.width / 2, renderer.height / 2);
	newGameLabel.pivot.set(bounds.width / 2, bounds.height / 2);
	newGameLabel.click = function () {
		currentStage = gameStage;
	};
	newGameLabel.mouseover = function () {
		newGameLabel.alpha = 1;
	};
	newGameLabel.mouseout = function () {
		newGameLabel.alpha = 0.8;
	};

	mainStage.addChild(newGameLabel);

	var i = 0;
	mainStage.onFrame = function () {
		i += 0.1;
		newGameLabel.rotation = Math.sin(i) * 0.06 - 0.03;
		if(i >= Math.PI * 2)
			i = 0;
	};
});
