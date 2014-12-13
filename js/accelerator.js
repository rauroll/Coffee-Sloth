var Accelerator = {
	accelerators: {},
	add: function (name, frequency, startFn, accelerationFn) {
		if(!(name in this.accelerators)) {
			startFn();
			this.accelerators[name] = setInterval(function () {
				accelerationFn();
			}, frequency);
		}
	},
	remove: function (name) {
		clearInterval(this.accelerators[name]);
		delete this.accelerators[name];
	}
};