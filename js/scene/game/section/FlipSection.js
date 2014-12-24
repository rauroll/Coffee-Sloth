function FlipSection() {
	Section.call(this, 500);
	this.sloth = SceneManager.getScene('game').getSloth();

	var container = new PIXI.DisplayObjectContainer();
	this.looped = false;

	var background = new PIXI.Graphics();
	background.beginFill(0xffffff);
	background.drawRect(0, 0, this.width, viewportHeight);
	background.alpha = 0.2;
	this.background = background;
	var redFilter = new PIXI.ColorMatrixFilter();
	redFilter.matrix = [
		0.5,0,0,0,
		0,0,0,0,
		0,0,0,0,
		0,0,0,1
	];
	var greenFilter = new PIXI.ColorMatrixFilter();
	greenFilter.matrix = [
		0,0,0,0,
		0,0.5,0,0,
		0,0,0,0,
		0,0,0,1
	];
	this.background.filters = [redFilter];

	var text = new PIXI.Text('Do a back flip before exiting the area!', {
		font: 'bold 20px Arial',
		fill: '#FFFFFF',
		stroke: '#222222',
		strokeThickness: 2
	});
	text.center(background);

	container.addChild(background);
	container.addChild(text);
	var t = this;
	$(t.sloth).on('loop', function (event, loops) {
		if(t.playerIsInside && !SceneManager.getScene('game').gameIsOver()) {
			if (loops < 0.8) {
				text.setText('Go!');
				text.center(background);
				t.looped = true;
				AudioManager.playFlip();
				t.background.filters = [greenFilter];
			}
		}
	});

	this.container = container;
}

FlipSection.weight = 0.5;

FlipSection.prototype = new Section();
FlipSection.prototype.constructor = Section;

FlipSection.prototype.playerEntered = function () {
	this.background.alpha = 0.5;
}

FlipSection.prototype.playerExited = function () {
	if (!this.looped)
		SceneManager.getScene('game').gameOver();
}