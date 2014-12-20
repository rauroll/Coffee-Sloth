function InteractiveText(text, size, onClick) {
	PIXI.Text.call(this, text, {
		font: 'bold ' + size + 'px Arial',
		fill: '#FFF'
	});
	this.interactive = true;
	this.click = onClick;
	this.alpha = 0.6;
	this.mouseover = function () {
		this.alpha = 1.0;
	};
	this.mouseout = function () {
		this.alpha = 0.6;
	};
};

InteractiveText.prototype = PIXI.Text.prototype;
InteractiveText.prototype.constructor = PIXI.Text;