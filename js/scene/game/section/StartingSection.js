/**
 * Created by Olli on 22/12/14.
 */
function generateStartingSection(width) {
    function StartingSection() {
        Section.call(this, width);
        this.container = new PIXI.DisplayObjectContainer(); // Empty container that can be drawn
        this.container.width = width;
    }

    StartingSection.prototype = new Section();
    StartingSection.prototype.constructor = Section;

    return StartingSection;

}