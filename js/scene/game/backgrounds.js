var farTexture = PIXI.Texture.fromImage("asset/image/bg-far.png");
var far = new PIXI.TilingSprite(farTexture, 960, 640);
var midTexture = PIXI.Texture.fromImage("asset/image/bg-mid.png");
var mid = new PIXI.TilingSprite(midTexture, 960, 640);
far.tilePosition.x = 0;
far.tilePosition.y = 0;
mid.tilePosition.x = 0;
mid.tilePosition.y = 0;
var floorTexture = PIXI.Texture.fromImage("asset/image/floorTile.png");
var floor = new PIXI.TilingSprite(floorTexture, 960, 50)
floor.tilePosition.x = 0;
floor.tilePosition.y = 0;
floor.anchor.y = -8.6;
//floor.tileScaleOffset.set(0, 430)
console.log(floor.tilePosition.y)