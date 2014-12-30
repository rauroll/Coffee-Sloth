/*

The loader scene, in which all the assets are loaded.

 */


function LoaderScene() {
	this.name = 'loader';
	this.scene = new PIXI.DisplayObjectContainer();

	var assetLoader = null;
	var spriteSheetLoader = null;
	
	var container = null;
	var progressBar = null;
	var progressBarOutline = null;
	var label = new PIXI.Text("Loading...", {
		font: "bold 60px Arial",
		fill: "#fff",
		dropShadow: true,
		dropShadowDistance: 1
	});
	var images = [
		'asset/image/bluetheme/bg-far.png',
		'asset/image/bluetheme/bg-mid.png',
		'asset/image/logo.png',
		'asset/image/main-background.jpg',
		'asset/image/sloth/slothsprite1.png',
		'asset/image/sloth/slothsprite2.png',
		'asset/image/sloth/slothsprite3.png',
		'asset/image/sloth/slothsprite4.png',
		'asset/image/sloth/slothsprite_nofire.png',
		'asset/image/bluetheme/floor.png',
		'asset/image/coffee.png',
		'asset/image/owl/owl1.png',
		'asset/image/owl/owl2.png',
		'asset/image/owl/owl3.png',
		'asset/image/unmuted.png',
		'asset/image/muted.png'
	];
	var soundAmount = AudioManager.init(function () { increaseProgress(); });
	var assetAmount = images.length + soundAmount;
	var loaded = 0;

	function increaseProgress() {
		progressBar.scale.x = ++loaded / assetAmount;
		if(loaded === assetAmount)
			SceneManager.changeScene('main');
	}

	assetLoader = new PIXI.AssetLoader(images);
	assetLoader.on('onProgress', function () { increaseProgress(); });
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

CScene.extendWith(LoaderScene);