PIXI.Stage.prototype.hasChild = function (child) {
	for (var i = 0; i < this.children.length; i++) {
		if(child === this.children[i])
			return true;
	}
	return false;
};

PIXI.DisplayObjectContainer.prototype.center = function (relativeTo) {
	if(!relativeTo)
		relativeTo = SceneManager.renderer;
	this.pivot.set(this.width / 2, this.height / 2);
	this.position.set(relativeTo.width / 2, relativeTo.height / 2);
};