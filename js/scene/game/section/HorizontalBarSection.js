function HorizontalBarSection() {
    function makeHorizontalBar(offset, width, height) {
        var bar = new PIXI.Graphics();
        bar.beginFill(0xFFFFFF, 0.9);
        bar.drawRect(offset, viewportHeight / 2 - height / 2, width - offset, height);
        return bar;
    }

    var width = 50;
    var maxHeight = 300;
    var offset = 30;
    Section.call(this, width + offset);

    this.stepper = 0;

    this.container = new PIXI.DisplayObjectContainer();
    this.barHeight = Math.random() * (maxHeight - 100) + 100;
    this.bar = makeHorizontalBar(offset, width, this.barHeight);
    this.container.addChild(this.bar);
    this.setBarPosition(Math.random() * 2 - 1);
}

HorizontalBarSection.weight = 1;

HorizontalBarSection.prototype = new Section();
HorizontalBarSection.prototype.constructor = Section;

HorizontalBarSection.prototype.collided = function () {
    SceneManager.getScene('game').gameOver();
}

HorizontalBarSection.prototype.checkForCollisionsWith = function(sloth) {
    if (sloth.collidesWithRect(this.bar))
        SceneManager.getScene('game').gameOver();
}

HorizontalBarSection.prototype.update = function () {
    this.setBarPosition(this.stepper += 0.01);
}

HorizontalBarSection.prototype.setBarPosition = function (pos) {
    this.bar.position.y = Math.sin(pos) * (viewportHeight / 2 - this.barHeight / 2);
}