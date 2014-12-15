var loaderStage = new PIXI.Stage();

$(document).ready(function () {
	var assets = [
		'asset/image/bg-far.png',
		'asset/image/bg-mid.png',
		'asset/image/logo.png',
		'asset/image/main-background.jpg',
		'asset/image/slothsprite.png'
	];
	var assetLoader = new PIXI.AssetLoader(assets);
	var loaded = 0;
	assetLoader.on('onProgress', function () {
		progressBar.scale.x = loaded++ / assets.length;
	});
	assetLoader.on('onComplete', function () {
		progressBar.scale.x = 1;
		setStage(mainStage)
	});
	assetLoader.load();

	var container = new PIXI.DisplayObjectContainer();

	// label
	var label = new PIXI.Text("Loading...", {
		font: "bold 60px Arial",
		fill: "#fff",
		dropShadow: true,
		dropShadowDistance: 1
	});
	container.addChild(label);

	// progressbar
	var progressBar = new PIXI.Graphics();
	progressBar.beginFill(0xFFFFFF);
	progressBar.drawRect(0, 0, label.width, 5);
	progressBar.position.set(0, label.height + 10);
	progressBar.scale.x = 0;
	container.addChild(progressBar);
	var progressBarOutline = new PIXI.Graphics();
	progressBarOutline.lineStyle(1, 0xFFFFFF);
	progressBarOutline.drawRect(0, 0, label.width, 5);
	progressBarOutline.position.set(0, label.height + 10);
	container.addChild(progressBarOutline);

	var bounds = container.getBounds();
	container.position.set(renderer.width / 2, renderer.height / 2);
	container.pivot.set(bounds.width / 2, bounds.height / 2);
	loaderStage.addChild(container);
});