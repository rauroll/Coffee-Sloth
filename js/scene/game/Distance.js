function Distance(width, height) {
	var margin = 10;
	var distance = 0;
	var maxDistance = 0;

	this.container = new PIXI.DisplayObjectContainer();

	var score = new PIXI.Text(distance, {
		font: 'bold 50px Arial',
		fill: '#FFF'
	});

	var scoreLabel = new PIXI.Text('Score:', {
		font: '50px Arial',
		fill: '#FFF'
	});
	scoreLabel.visible = false;

	this.container.addChild(scoreLabel);
	this.container.addChild(score);

	this.init = function () {
		distance = 0;
		maxDistance = 0;
		scoreLabel.visible = false;
	};

	this.update = function (amount) {
		distance += amount;
		maxDistance = Math.max(distance, maxDistance);
		score.setText(Math.round(maxDistance / 100));
		score.position.x = !scoreLabel.visible ? 0 : scoreLabel.width + margin;
		this.container.position.set(width - this.container.width - margin, height - this.container.height - margin);
	};

	this.showScoreLabel = function (show) {
		scoreLabel.visible = show;
	};
};