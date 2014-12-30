// Section that can be added to the sectionQueue of SectionManager, inherits Section.

function HorizontalBarSection() {
    var width = 50;
    var maxHeight = 300;
    var offset = 30;

    Section.call(this, width + offset);

    this.stepper = Math.random() * Math.PI;

    this.barHeight = Math.random() * (maxHeight - 100) + 100;

    var bar = new PIXI.Graphics();
    bar.beginFill(0xFFFFFF, 0.9);
    bar.drawRect(offset, viewportHeight / 2 - this.barHeight / 2, width - offset, this.barHeight);
    this.container = bar;
}

HorizontalBarSection.weight = 4;

HorizontalBarSection.prototype = new Section();
HorizontalBarSection.prototype.constructor = Section;

HorizontalBarSection.prototype.checkForCollisionsWith = function(sloth) {
    if (sloth.collidesWithRect(this.container))
        SceneManager.getScene('game').gameOver();
}

HorizontalBarSection.prototype.update = function () {
    this.container.position.y = Math.sin(this.stepper += 0.05) * (viewportHeight / 2 - this.barHeight / 2);
}