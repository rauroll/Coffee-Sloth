function KeyboardInputManager(actions) {
	this.actions = actions;
};

KeyboardInputManager.prototype.onKeyDown = function (code) {
	for (var i = 0; i < this.actions.length; i++) {
		var action = this.actions[i];
		if(action.keys.indexOf(code) >= 0) {
			action.onKeyDown(code);
			break;
		}
	};
};

KeyboardInputManager.prototype.onKeyUp = function (code) {
	for (var i = 0; i < this.actions.length; i++) {
		var action = this.actions[i];
		if(action.keys.indexOf(code) >= 0) {
			action.onKeyUp(code);
			break;
		}
	};
};

function KeyAction(keys, onKeyDown, onKeyUp) {
	this.keys = keys;
	this.onKeyDown = onKeyDown;
	this.onKeyUp = onKeyUp;
};