/**
 * Created by Olli on 17/12/14.
 */



GameObjectPool = function() {
    this.pool = [];
}

GameObjectPool.prototype = new PIXI.DisplayObjectContainer()

GameObjectPool.prototype.empty = function() {
    this.pool.splice(0);
};

GameObjectPool.prototype.update = function(amount) {
    for (var i = 0; i < this.pool.length; i++) {
        this.pool[i].position.x -= amount;
        if (this.pool[i].position.x < -1000) {
            console.log(this.pool.length);
            this.removeChild(this.pool.pop(i));
            console.log(this.pool.length);


            i--
        }
    }
    if (Math.random() > 0.99) {
        this.add();
    }
};

CoffeePool = function() {

};
CoffeePool.constructor = CoffeePool;
CoffeePool.prototype = new GameObjectPool();




CoffeePool.prototype.add = function(number) {
    if (!number) {
        var coffee = new PIXI.Sprite.fromImage("asset/image/coffee.png");
        coffee.position.x = 1100; // Spawn the object before it's visible.
        coffee.position.y = 430 * Math.random() + 50;
        this.pool.push(coffee);
        this.addChild(coffee);


    } else {
        for (var i = 0; i < number; i++) {
            this.pool.push(makeCoffee());
        }
    }
};

EnemyPool = function() {
};

EnemyPool.constructor = EnemyPool;
EnemyPool.prototype = new GameObjectPool();




EnemyPool.prototype.add = function(number) {
    if (number) {
        for (var i = 0; i < number; i++) {
            this.pool.push(createEnemy());
        }
    } else {
        var enemy = new PIXI.Sprite.fromImage("asset/image/enemy.png");
        enemy.position.x = 1100; // Spawn the object before it's visible.
        enemy.position.y = 430 * Math.random() + 50;
        this.pool.push(enemy);
        this.addChild(enemy);
    }
};

// These are not in use atm.
makeCoffee = function(coffee) {

    coffee = new PIXI.Sprite.fromImage("asset/image/coffee.png");
    coffee.position.x = 1100; // Spawn the object before it's visible.
    coffee.position.y = 430 * Math.random() + 50;
};

createEnemy = function(enemy) {
    enemy = new PIXI.Sprite.fromImage("asset/image/enemy.png");
    enemy.position.x = 1100; // Spawn the object before it's visible.
    enemy.position.y = 430 * Math.random() + 50;
};
