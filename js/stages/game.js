var gameStage = new PIXI.Stage(0x66FF55);


var sloth = new PIXI.Graphics();
sloth.beginFill(0x000000);
sloth.drawRect(100, 200, 50, 50);
gameStage.addChild(sloth);

var vel = 10;
var boost = 0;

gameStage.onFrame = function () {
	sloth.position.y += vel - boost;
	if(boost > 0)
		boost -= 0.1;
	else if(boost < 0)
		boost = 0;
};

gameStage.keyDown = function (code) {
	switch(code) {
		case 32:
			if(boost > 0)
				boost += 5;
			else
				boost += 10;
			break;
	}
};