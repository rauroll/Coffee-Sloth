function Sloth() {
	this.displayObject = new PIXI.Sprite.fromImage('asset/image/sloth/slothsprite1.png');
	this.displayObject.pivot.set(70, 30);
	this.displayObject.rotation = 0;
	var d = this.displayObject;

	var rotationStep = 8;

	var acceleration = 0;
	this.velocity = new PIXI.Point(0, 0);
	var removeRotationBoost = false;
	var rotationVelocity = 0;
	var interval;

	var slothFrameIndex = 1;
	var slothFrameOffset = 0;

	this.update = function (throttle) {
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

		this.velocity.x += acceleration * Math.sin(d.rotation + 1) + airResistance * this.velocity.x;
		this.velocity.y -= acceleration * Math.cos(d.rotation + 1) - gravity - airResistance * this.velocity.y;

		d.position.y += this.velocity.y;
		d.rotation += rotationVelocity / 200;

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
		d.position.set(250, 200);
		acceleration = 0;
		this.velocity.set(0, 0);
		d.rotation = 0;
	}
};