var mainStage = {
	stage: new PIXI.Stage(),
	bg: PIXI.Sprite.fromImage('asset/image/main-background.jpg'),
	blurFilter: new PIXI.BlurFilter(),
	logo: null,
	newGameLabel: new InteractiveText('New Game', 60, function () {
		setStage(gameStage);
	}),
	i: 0,
	onFrame: function () {
		this.i += 0.1;
		this.logo.scale.x *= Math.sin(this.i) * 0.001 + 1;
		this.logo.scale.y = this.logo.scale.x;
		if(this.i >= Math.PI * 2)
			this.i = 0;
	},
	init: function () {
		var t = this;
		// background
		this.blurFilter.blur = 20;
		this.bg.filters = [this.blurFilter];

		// coffee sloth label
		this.logo = PIXI.Sprite.fromImage('asset/image/logo.png');
		this.logo.center();
		this.logo.pivot.set(700 / 2, 200 / 2);

		// new game label
		this.newGameLabel.center();
		this.newGameLabel.position.y += 150;

		this.stage.addChild(this.bg);
		this.stage.addChild(this.logo);
		this.stage.addChild(this.newGameLabel);
	},
	keyboardManager: new KeyboardInputManager([
		new KeyAction([13], function () {
			setStage(gameStage);
		})
	])
};

$(window).on('rendererReady', function () {
	mainStage.init();
});