function generateFlipSection(sloth) {
	function FlipSection() {
		Section.call(this, 500);
		this.sloth = sloth;

		var container = new PIXI.DisplayObjectContainer();
		this.loopsLeft = 2;

		var background = new PIXI.Graphics();
		background.beginFill(0xffffff);
		background.drawRect(0, 0, this.width, 480);
		background.alpha = 0.2;
		this.background = background;

		var borderWidth = 6;
		var border = new PIXI.Graphics();
		border.lineStyle(borderWidth, 0xFF0000);
		border.drawRect(0, borderWidth / 2, this.width, viewportHeight - borderWidth);
		border.alpha = 0.9;
		border.visible = false;
		this.border = border;

		var text = new PIXI.Text('Do two front flips before exiting the area!', {
			font: 'bold 20px Arial',
			fill: '#FFFFFF'
		});
		text.position.set(50, 50);

		container.addChild(background);
		container.addChild(border);
		container.addChild(text);
		var t = this;
		$(sloth).on('loop', function (event, loops) {
			if(t.playerIsInside) {
				if (loops > 1.8)
					t.loopsLeft = 0;
				else if (loops > 0.8)
					t.loopsLeft--;

				if (t.loopsLeft === 1)
					text.setText('One left!');
				else if (t.loopsLeft === 0) {
					text.setText('Go go go!');
					t.border.visible = false;
				}
			}
		});

		this.container = container;
	}

	FlipSection.weight = 1;

	FlipSection.prototype = new Section();
	FlipSection.prototype.constructor = Section;

	FlipSection.prototype.playerEntered = function () {
		this.background.alpha = 0.5;
		this.border.visible = true;
	}

	FlipSection.prototype.playerExited = function () {
		if (this.loopsLeft > 0)
			SceneManager.getScene('game').gameOver();
	}

	return FlipSection;
};