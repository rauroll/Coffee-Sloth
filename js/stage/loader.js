var loaderStage = {
	stage: new PIXI.Stage(),
	assets: [
		'asset/image/bg-far.png',
		'asset/image/bg-mid.png',
		'asset/image/logo.png',
		'asset/image/main-background.jpg',
		'asset/image/sloth/slothsprite1.png',
		'asset/image/sloth/slothsprite2.png',
		'asset/image/sloth/slothsprite3.png',
		'asset/image/sloth/slothsprite4.png',
		'asset/image/sloth/slothsprite_nofire.png'
	],
	assetLoader: null,
	spriteSheetLoader: null,
	loaded: 0,
	container: null,
	progressBar: null,
	progressBarOutline: null,
	label: new PIXI.Text("Loading...", {
		font: "bold 60px Arial",
		fill: "#fff",
		dropShadow: true,
		dropShadowDistance: 1
	}),
	init: function () {
		var t = this;
		this.assetLoader = new PIXI.AssetLoader(this.assets);
		this.assetLoader.on('onProgress', function () {
			t.progressBar.scale.x = t.loaded++ / t.assets.length;
		});
		this.assetLoader.on('onComplete', function () {
			t.progressBar.scale.x = 1;
			setStage(mainStage)
		});
		this.assetLoader.load();
		
		this.progressBar = new PIXI.Graphics();
		this.progressBar.beginFill(0xFFFFFF);
		this.progressBar.drawRect(0, 0, this.label.width, 5);
		this.progressBar.position.set(0, this.label.height + 10);
		this.progressBar.scale.x = 0;
		
		this.progressBarOutline = new PIXI.Graphics();
		this.progressBarOutline.lineStyle(1, 0xFFFFFF);
		this.progressBarOutline.drawRect(0, 0, this.label.width, 5);
		this.progressBarOutline.position.set(0, this.label.height + 10);

		this.container = new PIXI.DisplayObjectContainer();
		this.container.addChild(this.label);
		this.container.addChild(this.progressBar);
		this.container.addChild(this.progressBarOutline);

		this.container.center();

		this.stage.addChild(this.container);
	}
};

$(window).on('rendererReady', function () {
	StageManager.changeStage(mainStage);
});