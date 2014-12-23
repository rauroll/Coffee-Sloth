var AudioManager = {
	theme: null,
	sounds: null,
	muted: localStorage.muted ? true : false,
	init: function (onProgress) {
		this.theme = new buzz.sound('asset/audio/theme.mp3', { loop: true });
		this.sounds = new buzz.group(this.theme);
		var i = 0;
		this.sounds.bind('canplaythrough', function () {
			if(onProgress)
				onProgress(++i);
		});
		this.sounds.load();
		this.mute(this.muted);
		return this.sounds.getSounds().length;
	},
	mute: function (mute) {
		this.muted = mute;
		localStorage.muted = mute;
		if(mute)
			this.sounds.mute();
		else
			this.sounds.unmute();
	},
	toggleMute: function () {
		if(this.muted)
			this.mute();
		else
			this.mute(true);
		return this.muted;
	},
	setThemeVolume: function (volume) {
		this.theme.setVolume(volume);
	}
};

function MuteButton() {
	var mutedTexture = PIXI.Texture.fromImage('asset/image/muted.png');
	var unmutedTexture = PIXI.Texture.fromImage('asset/image/unmuted.png');
	var sprite = new PIXI.Sprite(AudioManager.muted ? mutedTexture : unmutedTexture);
	sprite.position.set(SceneManager.renderer.width - 32 - 10, 10);
	sprite.alpha = 0.5;
	sprite.interactive = true;
	sprite.mouseover = function () { sprite.alpha = 1; };
	sprite.mouseout = function () { sprite.alpha = 0.5; };
	sprite.click = function () { 
		if(AudioManager.toggleMute())
			sprite.setTexture(mutedTexture);
		else
			sprite.setTexture(unmutedTexture);
	};
	return sprite;
};