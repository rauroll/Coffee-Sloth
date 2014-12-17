var coffeeBarWidth = 200;
var coffeeBarMargin = 20;

var coffeeBar = new PIXI.DisplayObjectContainer();

var coffeeBarInside = new PIXI.Graphics();
coffeeBarInside.beginFill(0xFFFFFF, 0.8);
coffeeBarInside.drawRect(0, 0, coffeeBarWidth, coffeeBarWidth / 10);
coffeeBarInside.scale.x = 1;
coffeeBar.addChild(coffeeBarInside);

var coffeeBarOutline = new PIXI.Graphics();
coffeeBarOutline.lineStyle(2, 0xFFFFFF, 0.8);
coffeeBarOutline.drawRect(0, 0, coffeeBarWidth, coffeeBarWidth / 10);
coffeeBar.addChild(coffeeBarOutline);

$(window).on('rendererReady', function () {
	coffeeBar.position.set(SceneManager.renderer.width - coffeeBarWidth - coffeeBarMargin, coffeeBarMargin);
});