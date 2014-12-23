var AudioManager = {
	theme: null,
	sounds: null,
	muted: localStorage.muted ? true : false,
	init: function (onProgress) {
		this.theme = new buzz.sound('asset/audio/theme.mp3', { loop: true });
		this.death = new buzz.sound('asset/audio/ded.mp3');
		this.flip = new buzz.sound('asset/audio/flip.mp3');
		this.coffee = [
			new buzz.sound('asset/audio/coffee1.mp3'),
			new buzz.sound('asset/audio/coffee2.mp3'),
			new buzz.sound('asset/audio/coffee3.mp3')
		];
		this.sounds = new buzz.group(this.theme, this.death, this.flip, this.coffee[0], this.coffee[1], this.coffee[2]);
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

		$(this).trigger('mutetoggle', this.muted);

		return this.muted;
	},
	setThemeVolume: function (volume) {
		if (this.theme.getVolume() !== volume) {
			if (this.fader)
				clearInterval(this.fader);
			var step = volume < this.theme.volume ? -1 : 1;
			var t = this;
			this.fader = setInterval(function () {
				t.theme.setVolume(t.theme.getVolume() + step);
				if(t.theme.getVolume() === volume)
					clearInterval(t.fader);
			}, 20);
		}
	},
	playCoffee: function () {
		var s = this.coffee[Math.round(Math.random() * (this.coffee.length - 1))];
		s.stop();
		s.play();
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
		sprite.setTexture(AudioManager.toggleMute() ? mutedTexture : unmutedTexture);
	};
	$(AudioManager).on('mutetoggle', function (e, muted) {
		sprite.setTexture(muted ? mutedTexture : unmutedTexture);
	});
	return sprite;
};