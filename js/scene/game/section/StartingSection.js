function generateStartingSection(width) {
    function StartingSection() {
        Section.call(this, width);
        this.container = new PIXI.DisplayObjectContainer();
        this.container.width = width;
    }

    StartingSection.prototype = new Section();
    StartingSection.prototype.constructor = Section;

    return StartingSection;

}