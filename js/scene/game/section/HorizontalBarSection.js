function HorizontalBarSection() {
    var width = 50;
    var maxHeight = 300;
    var offset = 30;

    Section.call(this, width + offset);

    this.stepper = 0;

    this.barHeight = Math.random() * (maxHeight - 100) + 100;

    var bar = new PIXI.Graphics();
    bar.beginFill(0xFFFFFF, 0.9);
    bar.drawRect(offset, viewportHeight / 2 - this.barHeight / 2, width - offset, this.barHeight);
    this.container = bar;
    this.setBarPosition(Math.random() * 2 - 1);
}

HorizontalBarSection.weight = 4;

HorizontalBarSection.prototype = new Section();
HorizontalBarSection.prototype.constructor = Section;

HorizontalBarSection.prototype.checkForCollisionsWith = function(sloth) {
    if (sloth.collidesWithRect(this.container))
        SceneManager.getScene('game').gameOver();
}

HorizontalBarSection.prototype.update = function () {
    this.setBarPosition(Math.sin(this.stepper += 0.05));
}

HorizontalBarSection.prototype.setBarPosition = function (pos) {
    this.container.position.y = pos * (viewportHeight / 2 - this.barHeight / 2);
}