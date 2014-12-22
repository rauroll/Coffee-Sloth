function CircularAvoidSection() {
	function Circle(radius, xPosition, rotationOffset) {
		var c = new PIXI.Graphics();
		c.beginFill(0xFFFFFF, 0.9);
		c.drawCircle(0, 0, 60);
		c.pivot.set(radius, radius);
		c.position.set(xPosition + 60, viewportHeight / 2);
		c.rotation = rotationOffset;
		this.displayObject = c;
		this.update = function () {
			this.displayObject.rotation += 0.03;
		};
	};
	var overlap = 50;
	var circleAmount = 3;
	var radius = 200;

	Section.call(this, viewportWidth);
	var container = new PIXI.DisplayObjectContainer();

	for (var i = 0; i < circleAmount; i++) {
		var x = i === 0 ? radius : radius * (i * 2 + 1) - overlap * i;
		var circle = new Circle(radius, x, Math.PI / 3 * i);
		this.objects.push(circle);
		container.addChild(circle.displayObject);
	}

	this.container = container;
};

CircularAvoidSection.weight = 10;

CircularAvoidSection.prototype = new Section();
CircularAvoidSection.prototype.constructor = Section;

CircularAvoidSection.prototype.checkForCollisionsWith = function (sloth) {
	this.objects.forEach(function (e) {
		if (sloth.collidesWith(e.displayObject))
			SceneManager.getScene('game').gameOver();
	});
};