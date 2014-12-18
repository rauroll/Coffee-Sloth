function CScene() {
	this.name;
	this.scene;
	this.keyboardManager;
};

CScene.prototype = {
	update: function () {},
	init: function () {},
	attach: function () {},
	deattach: function () {}
};

CScene.extendWith = function (c) {
	c.prototype = CScene.prototype;
	c.prototype.constructor = CScene;
};