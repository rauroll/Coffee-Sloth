function KeyboardInputManager(actions) {
	this.actions = actions;
};

KeyboardInputManager.prototype.keyDown = function (code) {
	for (var i = 0; i < this.actions.length; i++) {
		var action = this.actions[i];
		if(action.keys.indexOf(code) >= 0) {
			if(!action.active) {
				action.onKeyDown(code);
				action.active = true;
			}
			break;
		}
	};
};

KeyboardInputManager.prototype.keyUp = function (code) {
	for (var i = 0; i < this.actions.length; i++) {
		var action = this.actions[i];
		if(action.keys.indexOf(code) >= 0) {
			action.onKeyUp(code);
			action.active = false;
			break;
		}
	};
};

function KeyAction(keys, onKeyDown, onKeyUp) {
	this.keys = keys;
	this.onKeyDown = onKeyDown;
	this.onKeyUp = onKeyUp;
	this.active = false;
};