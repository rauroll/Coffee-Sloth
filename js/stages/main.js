var mainStage = new PIXI.Stage(0x66FF99);


// background
var bg = PIXI.Sprite.fromImage('assets/img/main-background.jpg');
mainStage.addChild(bg);

// new game label
var newGameLabel = new PIXI.Text("New Game", {
	font: "bold 72px Arial"
});
newGameLabel.interactive = true;
var b = newGameLabel.getBounds();
newGameLabel.position.set(400, 100);
newGameLabel.pivot.set(b.width / 2, b.height / 2);
newGameLabel.click = function () {
	currentStage = gameStage;
};

mainStage.addChild(newGameLabel);

var i = 0;
mainStage.onFrame = function () {
	i += 0.2;
	newGameLabel.rotation = Math.sin(i) * 0.1 - 0.05;
};