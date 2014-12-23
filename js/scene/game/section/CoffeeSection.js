function Coffee (width, height) {
    this.sprite = PIXI.Sprite.fromImage("asset/image/coffee.png");
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);
    this.sprite.position.x = (Math.min(width - this.sprite.width, width * Math.random()));
    this.sprite.position.y = (Math.min(height - 100, Math.min(height - this.sprite.height, height * Math.random())));

    this.scaleStepper = 0;
    this.rotationStepper = 0;
};

Coffee.prototype = new PIXI.DisplayObjectContainer();
Coffee.prototype.update = function () {
    this.sprite.rotation = Math.sin(this.rotationStepper += 0.2) * 0.1;
    this.sprite.scale.x = ((Math.sin(this.scaleStepper += 0.3) + 1) / 2) * 0.2 + 0.8;
    this.sprite.scale.y = this.sprite.scale.x;
};

// Section that can be added to the sectionQueue of SectionManager, inherits Section.
function CoffeeSection () {
    Section.call(this, 205);

    this.objects.splice(0);
    var container = new PIXI.DisplayObjectContainer();
    var coffee = new Coffee(205, SceneManager.renderer.height);
    container.addChild(coffee.sprite);

    this.objects.push(coffee);
    this.container = coffee.addChild(container);
};

CoffeeSection.weight = 5;

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
            j--;
        }
    }
}