function CStage() {
	this.name;
	this.stage;
	this.keyboardManager;
};

CStage.prototype = {
	update: function () {},
	init: function () {},
	attached: function () {},
	deattached: function () {}
};

CStage.extendWith = function (c) {
	c.prototype = CStage.prototype;
	c.prototype.constructor = CStage;
};