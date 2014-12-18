function Distance(width, height) {
	var margin = 10;
	var distance = 0;
	this.container = new PIXI.Text(distance, {
		font: 'bold 50px Arial',
		fill: '#FFF'
	});

	this.init = function () {
		distance = 0;
	};

	this.update = function (amount) {
		if(amount >= 0) {
			distance += amount;
			this.container.setText(Math.round(distance / 100));
			this.container.position.set(width - this.container.width - margin, height - this.container.height - margin);
		}
	};
};