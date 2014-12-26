function Sloth() {
	var radius = 50;
	var xPosition = 400;
	this.displayObject = new PIXI.Sprite.fromImage('asset/image/sloth/slothsprite1.png');
	this.displayObject.pivot.set(70, 30);
	this.displayObject.rotation = 0;
	var d = this.displayObject;

	var rotationStep = 8;

	var acceleration = 0;

	var trueVelocity = new PIXI.Point(0, 0);
	this.velocity = new PIXI.Point(0, 0);

	var removeRotationBoost = false;
	var rotationVelocity = 0;
	var interval;
	var collisionRange = 20;

	var slothFrameIndex = 1;
	var slothFrameOffset = 0;

	var spinStart = 0;

	this.update = function (throttle) {
		// draw the texture
		if (throttle) {
			if (slothFrameOffset > 3) {
				slothFrameIndex = slothFrameIndex % 4 + 1;
				slothFrameOffset = 0;
			}
			d.setTexture(PIXI.Texture.fromImage('asset/image/sloth/slothsprite' + slothFrameIndex + '.png'));
			slothFrameOffset++;
		}
		else
			d.setTexture(PIXI.Texture.fromImage('asset/image/sloth/slothsprite_nofire.png'));

		// update velocities
		trueVelocity.x += acceleration * Math.sin(d.rotation + 1) + airResistance * trueVelocity.x;
		trueVelocity.y -= acceleration * Math.cos(d.rotation + 1) - gravity - airResistance * trueVelocity.y;

		// check to see if we should move backwards
		if (!SceneManager.getScene('game').sectionManager.canMoveBackwards() && (Math.sin(d.rotation + 1) < 0 || d.position.x < xPosition)) {
			this.velocity.x = 0;
			d.position.x = Math.max(d.pivot.x, d.position.x + trueVelocity.x);
		}
		else
			this.velocity.x = trueVelocity.x;

		this.velocity.y = trueVelocity.y;

		d.position.y = Math.max(d.position.y + trueVelocity.y, d.pivot.y);

		// velocities should be zero when on an edge
		if (d.position.x <= d.pivot.x)
			trueVelocity.x = 0;

		if (d.position.y <= d.pivot.y)
			trueVelocity.y = 0;

		// update rotation
		d.rotation += rotationVelocity / 200;

		// check for loops
		if (Math.abs(rotationVelocity) > 15 && spinStart === 0)
			spinStart = d.rotation;
		else if (Math.abs(rotationVelocity) < 15 && spinStart !== 0) {
			var loops = (d.rotation - spinStart) / (2 * Math.PI);
			if (Math.abs(loops) > 0.5)
				$(this).trigger('loop', loops);
			spinStart = 0;
		}

		// decrease rotation if necessary
		if(removeRotationBoost && rotationVelocity !== 0)
			rotationVelocity += rotationVelocity > 0 ? -0.5 : 0.5;
	}
	this.accelerate = function (accelerate) {
		acceleration = accelerate ? 0.4 : 0;
	}
	this.startRotation = function (direction) {
		rotationVelocity = direction === 'right' ? rotationStep : -rotationStep;
		removeRotationBoost = false;
		interval = setInterval(function () {
			rotationVelocity *= 1.07;
		}, 50);
	}
	this.stopRotation = function () {
		removeRotationBoost = true;
		clearInterval(interval);
		interval = false;
	}
	this.init = function () {
		d.position.set(xPosition, 200);
		acceleration = 0;
		trueVelocity.set(0, 0);
		rotationVelocity = 0;
		d.rotation = 0;
	}
	this.collidesWith = function (x, y) {
		return Math.sqrt(x !== undefined ? Math.pow(d.position.x - x, 2) : 0 + y !== undefined ? Math.pow(d.position.y - y, 2) : 0) < radius;
	}
	this.collidesWithRect = function(sprite) {
		var spriteBounds = sprite.getBounds();
		var slothx = d.position.x;
		var slothy = d.position.y;
		var x2 = spriteBounds.x + spriteBounds.width;
		var y2 = spriteBounds.y + spriteBounds.height;
		var xDiff = (slothx < spriteBounds.x) ? spriteBounds.x - slothx : slothx - x2;
		var yDiff = (slothy < spriteBounds.y) ? spriteBounds.y - slothy : slothy - y2;
		xDiff = (xDiff < 0) ? 0 : xDiff;
		yDiff = (yDiff < 0) ? 0 : yDiff;
		return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)) < collisionRange;
	}

	this.getLocation = function() {
		return d.position;
	}
};