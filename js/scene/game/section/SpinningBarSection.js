function SpinningBarSection() {
	var maxWidth = 0.9 * viewportHeight;
	var minWidth = 500;
	this.barHeight = 20;
	var margin = 200;

	var width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
	Section.call(this, width + margin);
	var bar = new PIXI.Graphics();
	bar.beginFill(0xFFFFFF, 0.9);
	bar.drawRect(0, 0, width, this.barHeight);
	bar.pivot.set(width / 2, 0);
	bar.position.set(0, viewportHeight / 2);
	this.container = bar;
}

SpinningBarSection.weight = 0.8;

SpinningBarSection.prototype = new Section();
SpinningBarSection.prototype.constructor = Section;

SpinningBarSection.prototype.checkForCollisionsWith = function (sloth) {
    if (sloth.collidesWithRect(this.container))
        SceneManager.getScene('game').gameOver();
}

SpinningBarSection.prototype.update = function (sloth) {
	this.container.rotation += 0.01;
}