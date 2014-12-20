function Coffee (width, height) {
    this.sprite = PIXI.Sprite.fromImage("asset/image/coffee.png");
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);
    this.sprite.position.x = (Math.min(width - this.sprite.width, width * Math.random()));
    this.sprite.position.y = (Math.min(height - 100, Math.min(height - this.sprite.height, height * Math.random())));
};

Coffee.prototype = new PIXI.DisplayObjectContainer();
Coffee.prototype.update = function () {
    this.sprite.rotation += 0.08;
};

// Section that can be added to the sectionQueue of SectionManager, inherits Section.
function CoffeeSection (width) {
    Section.call(this, width);
    this.getContainer = function(target) {
        this.objects.splice(0);
        var container = new PIXI.DisplayObjectContainer();
        var coffee = new Coffee(205, SceneManager.renderer.height);
        container.addChild(coffee.sprite);

        target.objects.push(coffee);
        return coffee.addChild(container);
    };
};

CoffeeSection.prototype.update = function () {
    this.objects.forEach(function (e) {
        e.update();
    });
};

CoffeeSection.prototype = new Section();
CoffeeSection.prototype.constructor = CoffeeSection;