function StartingSection() {
	var width = viewportWidth * 0.8;
    Section.call(this, width);
    this.container = new PIXI.DisplayObjectContainer();
    this.container.width = width;
}

StartingSection.prototype = new Section();
StartingSection.prototype.constructor = Section;