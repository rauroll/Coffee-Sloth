var mainStage = {
	stage: new PIXI.Stage(),
	bg: PIXI.Sprite.fromImage('asset/image/main-background.jpg'),
	blurFilter: new PIXI.BlurFilter(),
	logo: PIXI.Sprite.fromImage('asset/image/logo.png'),
	newGameLabel: new PIXI.Text("New Game", {
		font: "bold 60px Arial",
		fill: "#fff",
		dropShadow: true,
		dropShadowDistance: 1
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
		this.logo.position.set(renderer.width / 2, renderer.height / 2);
		this.logo.pivot.set(700 / 2, 200 / 2);

		// new game label
		this.newGameLabel.alpha = 0.8;
		this.newGameLabel.interactive = true;
		var bounds = this.newGameLabel.getBounds();
		this.newGameLabel.position.set(renderer.width / 2, renderer.height / 2 + 150);
		this.newGameLabel.pivot.set(bounds.width / 2, bounds.height / 2);
		this.newGameLabel.click = function () {
			setStage(gameStage);
		};
		this.newGameLabel.mouseover = function () {
			t.newGameLabel.alpha = 1;
		};
		this.newGameLabel.mouseout = function () {
			t.newGameLabel.alpha = 0.8;
		};

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