/**
 * Created by Olli on 17/12/14.
 */

var coffeeSprite;
var enemySprite;

var extendObj = function(child, parent) {
    var tmp = function () {}
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
};



function GameObject(sprite, width, height) {


    this.sprite = sprite;
    this.sprite.position.x = width * Math.random(); // Spawn the object before it's visible.
    this.sprite.position.y = height * Math.random();

};

GameObject.prototype.update = function() {
    //this.sprite.position.x -= amount;
    this.sprite.rotation += 0.03;
};


GameObject.prototype.constructor = GameObject;





function Coffee(sprite, width, height) {
    GameObject.call(this, sprite, width, height);
    this.sprite.pivot.set(12, 20);
};

extendObj(Coffee, GameObject);
Coffee.prototype.constructor = Coffee;



function Enemy(sprite, width, height) {
    GameObject.call(this, sprite, width, height);
    this.sprite.pivot.set(20, 20);
};

extendObj(Enemy, GameObject);
Enemy.prototype.constructor = GameObject;





function GameObjectPool() {
    this.pool = [];
}

GameObjectPool.prototype = new PIXI.DisplayObjectContainer();
GameObjectPool.prototype.constructor = GameObjectPool;

GameObjectPool.prototype.empty = function() {
    this.pool.splice(0);
};

GameObjectPool.prototype.update = function(amount) {

    for (var i = 0; i < this.pool.length; i++) {
        //if (this.pool.length == 0) {
        //    break;
        //}

        this.pool[i].update(amount);
        //if (this.pool[i].sprite.position.x < -1000) {
        //    this.pool.pop(i)
        //    this.removeChildAt(i);
        //    i--
        //}
    }
    //if (Math.random() > 0.99) {
    //    this.add();
    //}
};

function CoffeePool() {
    GameObjectPool.call(this);
};

CoffeePool.prototype = new GameObjectPool();
CoffeePool.prototype.constructor = CoffeePool;




CoffeePool.prototype.add = function(width, height) {
    if (!coffeeSprite) {
        coffeeSprite = new PIXI.Sprite.fromImage("asset/image/coffee.png");
    }
    var coffee = new Coffee(coffeeSprite, width, height);
    this.pool.push(coffee);
    this.addChild(coffee.sprite);

};

function EnemyPool() {
    GameObjectPool.call(this);

};


EnemyPool.prototype = new GameObjectPool();
EnemyPool.prototype.constructor = EnemyPool;




EnemyPool.prototype.add = function(number, width, height) {
    if (!enemySprite) {
        enemySprite = new PIXI.Sprite.fromImage("asset/image/enemy.png");
    }
    var enemy = new Enemy(enemySprite, width, height);
    if (number) {
        for (var i = 0; i < number; i++) {
            this.pool.push(enemy);
            this.addChild(enemy.sprite);
        }
    } else {
        this.pool.push(enemy);
        this.addChild(enemy.sprite);
    }
};