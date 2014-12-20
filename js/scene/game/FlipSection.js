function FlipSectionWrapper(sloth) {
	function FlipSection() {
		Section.call(this, 500);
		this.sloth = sloth;

		var container = new PIXI.DisplayObjectContainer();
		this.loopsLeft = 2;

		var background = new PIXI.Graphics();
		background.beginFill(0xffffff, 0.4);
		background.drawRect(0, 0, this.width, 480);

		var text = new PIXI.Text('Do two front flips before exiting the area!', {
			font: 'bold 20px Arial',
			fill: '#FFFFFF'
		});
		text.position.set(50, 50);

		container.addChild(background);
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
				else if (t.loopsLeft === 0)
					text.setText('You are free to go!');
			}
		});

		this.container = container;
	}

	FlipSection.prototype = new Section();
	FlipSection.prototype.constructor = Section;

	return FlipSection;
};