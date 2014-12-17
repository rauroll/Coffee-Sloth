var farTexture = PIXI.Texture.fromImage("asset/image/bg-far.png");
var far = new PIXI.TilingSprite(farTexture, 960, 640);
var midTexture = PIXI.Texture.fromImage("asset/image/bg-mid.png");
var mid = new PIXI.TilingSprite(midTexture, 960, 640);
far.tilePosition.x = 0;
far.tilePosition.y = 0;
mid.tilePosition.x = 0;
mid.tilePosition.y = 0;