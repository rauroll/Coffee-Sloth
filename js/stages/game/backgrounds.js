var farTexture = PIXI.Texture.fromImage("assets/img/bg-far.png");
var far = new PIXI.TilingSprite(farTexture, 960, 480);
var midTexture = PIXI.Texture.fromImage("assets/img/bg-mid.png");
var mid = new PIXI.TilingSprite(midTexture, 960, 480);
far.tilePosition.x = 0;
far.tilePosition.y = 0;
mid.tilePosition.x = 0;
mid.tilePosition.y = 0;