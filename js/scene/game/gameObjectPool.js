/**
 * Created by Olli on 17/12/14.
 */

var coffeeSprite = new PIXI.Sprite.fromImage("asset/image/coffee.png");
var enemySprite = new PIXI.Sprite.fromImage("asset/image/enemy.png");

GameObjectPool = function() {
    this.pool = [];
}

GameObjectPool.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
GameObjectPool.prototype.constructor = GameObjectPool;

GameObjectPool.prototype.empty = function() {
    this.pool.splice(0);
};

GameObjectPool.prototype.update = function(amount) {
/*    for (var i = 0; i < this.pool.length; i++) {
        console.log();
        this.pool[i].update(amount);
        if (this.pool[i].sprite.position.x < -1000) {
            this.removeChild(this.pool.pop(i).sprite);
            i--
        }
    }
    if (Math.random() > 0.99) {
        this.add();
    }*/
};

CoffeePool = function() {
    GameObjectPool.call(this);
};

CoffeePool.prototype = Object.create(GameObjectPool.prototype);
CoffeePool.constructor = CoffeePool;




CoffeePool.prototype.add = function(number) {
    if (number) {
        for (var i = 0; i < number; i++) {
            var coffee = new Coffee();
            this.pool.push(coffee);
            this.addChild(coffee.sprite);
        }
    } else {
        var coffee = new Coffee();
        this.pool.push(coffee);
        this.addChild(coffee.sprite);


    }
};

EnemyPool = function() {
    GameObjectPool.call(this);

};


EnemyPool.prototype = Object.create(GameObjectPool.prototype);
EnemyPool.prototype.constructor = EnemyPool;




EnemyPool.prototype.add = function(number) {
    if (number) {
        for (var i = 0; i < number; i++) {
            var enemy = new Enemy();
            this.pool.push(enemy);
            this.addChild(enemy.sprite);
        }
    } else {
        var enemy = new Enemy();
        this.pool.push(enemy);
        this.addChild(enemy.sprite);
    }
};


GameObject = function(sprite) {
    PIXI.DisplayObject.call(this, sprite);
    this.sprite = sprite;
    this.sprite.position.x = 1100; // Spawn the object before it's visible.
    this.sprite.position.y = 430 * Math.random() + 50;

};

GameObject.prototype.update = function(amount) {
    this.sprite.position.x -= amount;
};


GameObject.prototype = Object.create(PIXI.DisplayObject.prototype);
GameObject.prototype.constructor = GameObject;

Coffee = function() {
    GameObject.call(this, coffeeSprite);

};

Coffee.prototype.update = function(amount) {
    this.sprite.position.x -= amount
}


Coffee.prototype = Object.create(GameObject.prototype);
Coffee.prototype.constructor = Coffee;

Enemy = function() {
    GameObject.call(this, enemySprite);

};

Enemy.prototype.update = function(amount) {
    this.sprite.position.x -= amount
}


Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;
