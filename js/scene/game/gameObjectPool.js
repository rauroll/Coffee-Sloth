///**
// * Created by Olli on 17/12/14.
// */
//
//var coffeeSprite;
//var enemySprite;
//
//var extendObj = function(child, parent) {
//    var tmp = function () {}
//    tmp.prototype = parent.prototype;
//    child.prototype = new tmp();
//    child.prototype.constructor = child;
//};
//
//
//
//function GameObject(sprite, width, height) {
//
//
//    this.sprite = sprite;
//    this.sprite.position.x = width * Math.random(); // Spawn the object before it's visible.
//    this.sprite.position.y = height * Math.random();
//
//};
//
//GameObject.prototype.update = function(amount) {
//    //this.sprite.position.x -= amount;
//    this.sprite.rotation += amount;
//};
//
//
//GameObject.prototype.constructor = GameObject;
//
//
//
//
//
//function Coffee(width, height) {
//    GameObject.call(this, PIXI.Sprite.fromImage("asset/image/coffee.png"), width, height);
//    this.sprite.pivot.set(12, 20);
//};
//
//extendObj(Coffee, GameObject);
//Coffee.prototype.constructor = Coffee;
//
//
//
//function Enemy(sprite, width, height) {
//    GameObject.call(this, sprite, width, height);
//    this.sprite.pivot.set(20, 20);
//};
//
//extendObj(Enemy, GameObject);
//Enemy.prototype.constructor = GameObject;
//
//
//
//
//
//function GameObjectPool() {
//    this.pool = [];
//}
//
//GameObjectPool.prototype = new PIXI.DisplayObjectContainer();
//GameObjectPool.prototype.constructor = GameObjectPool;
//
//GameObjectPool.prototype.empty = function() {
//    this.pool.splice(0);
//};
//
//GameObjectPool.prototype.update = function() {
//
//    for (var i = 0; i < this.pool.length; i++) {
//        //if (this.pool.length == 0) {
//        //    break;
//        //}
//
//        this.pool[i].update(0.01);
//        //if (this.pool[i].sprite.position.x < -1000) {
//        //    this.pool.pop(i)
//        //    this.removeChildAt(i);
//        //    i--
//        //}
//    }
//    //if (Math.random() > 0.99) {
//    //    this.add();
//    //}
//};
//
//function CoffeePool() {
//    GameObjectPool.call(this);
//};
//
//CoffeePool.prototype = new GameObjectPool();
//CoffeePool.prototype.constructor = CoffeePool;
//
//
//
//
//CoffeePool.prototype.add = function(width, height) {
//    if (!coffeeSprite) {
//        coffeeSprite = new PIXI.Sprite.fromImage("asset/image/coffee.png");
//    }
//    var coffee = new Coffee(coffeeSprite, width, height);
//    this.pool.push(coffee);
//    return this.addChild(coffee.sprite);
//
//};
//
//function EnemyPool() {
//    GameObjectPool.call(this);
//
//};
//
//
//EnemyPool.prototype = new GameObjectPool();
//EnemyPool.prototype.constructor = EnemyPool;
//
//
//
//
//EnemyPool.prototype.add = function(width, height) {
//    if (!enemySprite) {
//        enemySprite = new PIXI.Sprite.fromImage("asset/image/enemy.png");
//    }
//    var enemy = new Enemy(enemySprite, width, height);
//    this.pool.push(enemy);
//    return this.addChild(enemy.sprite);
//};

function Coffee(width, height) {
    this.sprite = PIXI.Sprite.fromImage("asset/image/coffee.png");
    this.sprite.pivot.set(this.sprite.width/2, this.sprite.height/2);
    this.sprite.position.x = (Math.min(width - this.sprite.width, width * Math.random()));
    this.sprite.position.y = (Math.min(height - 100, Math.min(height - this.sprite.height, height * Math.random())));
}

Coffee.prototype = new PIXI.DisplayObjectContainer();
Coffee.prototype.update = function() {
    this.sprite.rotation += 0.08;
}

// Section that can be added to the sectionQueue of SectionManager, inherits Section.
function CoffeeSection(width) {
    Section.call(this, width);
    this.getContainer = function(target) {
        this.objects.splice(0);
        var container = new PIXI.DisplayObjectContainer();
        var coffee = new Coffee(205, SceneManager.renderer.height);
        container.addChild(coffee.sprite);

        target.objects.push(coffee);
        return coffee.addChild(container);
    }
}

CoffeeSection.prototype = {
    update: function() {
        this.objects.forEach(function(e) {e.update()});
    }
};

CoffeeSection.prototype = new Section();
CoffeeSection.prototype.constructor = CoffeeSection;



















