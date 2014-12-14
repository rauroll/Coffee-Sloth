var mainStage = new PIXI.Stage();

$(document).ready(function () {
	// background
	var bg = PIXI.Sprite.fromImage('assets/img/main-background.jpg');
	var blurFilter = new PIXI.BlurFilter();
	blurFilter.blur = 20;
	bg.filters = [blurFilter];
	mainStage.addChild(bg);

	// coffee sloth label
	var logo = PIXI.Sprite.fromImage('assets/img/logo.png');
	logo.position.set(renderer.width / 2, renderer.height / 2);
	logo.pivot.set(700 / 2, 200 / 2);
	mainStage.addChild(logo);

	// new game label
	var newGameLabel = new PIXI.Text("New Game", {
		font: "bold 60px Arial",
		fill: "#fff",
		dropShadow: true,
		dropShadowDistance: 1
	});
	newGameLabel.alpha = 0.8;
	newGameLabel.interactive = true;
	var bounds = newGameLabel.getBounds();
	newGameLabel.position.set(renderer.width / 2, renderer.height / 2 + 150);
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
		logo.scale.x *= Math.sin(i) * 0.001 + 1;
		logo.scale.y = logo.scale.x;
		if(i >= Math.PI * 2)
			i = 0;
	};
});
