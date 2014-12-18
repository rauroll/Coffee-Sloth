function LoaderScene() {
	this.name = 'loader';
	this.scene = new PIXI.DisplayObjectContainer();

	var assetLoader = null;
	var spriteSheetLoader = null;
	var loaded = 0;
	var container = null;
	var progressBar = null;
	var progressBarOutline = null;
	var label = new PIXI.Text("Loading...", {
		font: "bold 60px Arial",
		fill: "#fff",
		dropShadow: true,
		dropShadowDistance: 1
	});
	var assets = [
		'asset/image/bg-far.png',
		'asset/image/bg-mid.png',
		'asset/image/logo.png',
		'asset/image/main-background.jpg',
		'asset/image/sloth/slothsprite1.png',
		'asset/image/sloth/slothsprite2.png',
		'asset/image/sloth/slothsprite3.png',
		'asset/image/sloth/slothsprite4.png',
		'asset/image/sloth/slothsprite_nofire.png',
		'asset/image/floorTile.png',
		'asset/image/coffee.png',
		'asset/image/enemy.png'
	];
	this.init = function () {
		assetLoader = new PIXI.AssetLoader(assets);
		assetLoader.on('onProgress', function () {
			progressBar.scale.x = loaded++ / assets.length;
		});
		assetLoader.on('onComplete', function () {
			progressBar.scale.x = 1;
			SceneManager.changeScene('main');
		});
		assetLoader.load();
		
		progressBar = new PIXI.Graphics();
		progressBar.beginFill(0xFFFFFF);
		progressBar.drawRect(0, 0, label.width, 5);
		progressBar.position.set(0, label.height + 10);
		progressBar.scale.x = 0;
		
		progressBarOutline = new PIXI.Graphics();
		progressBarOutline.lineStyle(1, 0xFFFFFF);
		progressBarOutline.drawRect(0, 0, label.width, 5);
		progressBarOutline.position.set(0, label.height + 10);

		container = new PIXI.DisplayObjectContainer();
		container.addChild(label);
		container.addChild(progressBar);
		container.addChild(progressBarOutline);

		container.center();

		this.scene.addChild(container);
	};
};

CScene.extendWith(LoaderScene);