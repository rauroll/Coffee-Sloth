function Coffee (width, height) {
    this.sprite = PIXI.Sprite.fromImage("asset/image/coffee.png");
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);

    if (Math.random() > 0.3)
        Coffee.direction = Coffee.randomDirection();

    if (!Coffee.lastPosition)
        Coffee.lastPosition = Math.random() * viewportHeight / 2;

    var newPosition = Coffee.lastPosition + Coffee.direction;
    if (newPosition > viewportHeight - this.sprite.pivot.y || newPosition < this.sprite.pivot.y) {
        Coffee.direction *= -1;
        newPosition = Coffee.lastPosition + Coffee.direction;
    }

    this.sprite.position.set(0, Coffee.lastPosition = newPosition);

    this.scaleStepper = 0;
    this.rotationStepper = 0;
};

Coffee.randomDirection = function () {
    var max = 200, min = 0;
    return max / 2 - Math.random() * (max - min) + min;
};

Coffee.lastPosition;
Coffee.direction = Coffee.randomDirection();

Coffee.prototype = new PIXI.DisplayObjectContainer();
Coffee.prototype.update = function () {
    this.sprite.rotation = Math.sin(this.rotationStepper += 0.2) * 0.1;
    this.sprite.scale.x = ((Math.sin(this.scaleStepper += 0.3) + 1) / 2) * 0.2 + 0.8;
    this.sprite.scale.y = this.sprite.scale.x;
};

// Section that can be added to the sectionQueue of SectionManager, inherits Section.
function CoffeeSection () {
    var width = 205;
    Section.call(this, width);

    this.objects.splice(0);
    var container = new PIXI.DisplayObjectContainer();
    var coffee = new Coffee(width, viewportHeight);
    coffee.sprite.position.x = width / 2;
    container.addChild(coffee.sprite);

    this.objects.push(coffee);
    this.container = coffee.addChild(container);
};

CoffeeSection.weight = 25;



CoffeeSection.prototype = new Section();
CoffeeSection.prototype.constructor = CoffeeSection;


CoffeeSection.prototype.update = function () {
    this.objects.forEach(function (e) {
        e.update();
    });
};

CoffeeSection.prototype.checkForCollisionsWith = function(sloth) {
    for (var j = 0; j < this.objects.length; j++) {
        var obj = this.objects[j];
        if (sloth.collidesWithRect(obj.sprite)) {
            SceneManager.getScene('game').getCoffeeBar().increase();
            this.container.removeChildAt(j);
            this.objects.splice(j, 1);
            AudioManager.playCoffee();
            j--;
        }
    }
}