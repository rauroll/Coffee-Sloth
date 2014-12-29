function EmptySection(width) {
    Section.call(this, width);
    this.container = new PIXI.DisplayObjectContainer();
    this.container.width = this.width;
}

EmptySection.prototype = new Section();
EmptySection.prototype.constructor = Section;

function RandomEmptySection() {
	var max = viewportWidth * 0.5;
	var min = 50;
	EmptySection.call(this, Math.floor(Math.random() * (max - min + 1) + min));
}

RandomEmptySection.weight = 1000;

RandomEmptySection.prototype = new EmptySection();
RandomEmptySection.prototype.constructor = EmptySection;