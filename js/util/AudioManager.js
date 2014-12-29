var AudioManager = {
	sounds: {},
	soundGroup: null,
	muted: localStorage.muted === 'true',
	init: function (onProgress) {
		var t = this;
		var sounds = [];
		[	'theme',
			'death',
			'flip',
			'owl',
			'coffee1',
			'coffee2',
			'coffee3'
		].forEach(function (soundName) {
			var sound = new buzz.sound(['asset/audio/' + soundName + '.mp3', 'asset/audio/' + soundName + '.ogg']);
			sounds.push(sound);
			t.sounds[soundName] = sound;
		});

		this.soundGroup = new buzz.group(sounds);
		var i = 0;
		this.soundGroup.bind('canplaythrough', function () {
			if(onProgress)
				onProgress(++i);
		});
		this.soundGroup.load();
		this.mute(this.muted);
		return this.soundGroup.getSounds().length;
	},
	mute: function (mute) {
		this.muted = mute;
		localStorage.muted = mute;
		if(mute)
			this.soundGroup.mute();
		else
			this.soundGroup.unmute();
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
		this.sounds.theme.fadeTo(volume, 1000);
	},
	play: function (sound) {
		var s = this.sounds[sound];
		s.stop();
		s.play();
	},
	playTheme: function () {
		this.sounds.theme.loop().play();
	},
	playCoffee: function () {
		var s = this.sounds['coffee' + Math.floor(Math.random() * 3 + 1)];
		s.stop();
		s.play();
	}
};

function MuteButton() {
	var mutedTexture = PIXI.Texture.fromImage('asset/image/muted.png');
	var unmutedTexture = PIXI.Texture.fromImage('asset/image/unmuted.png');
	var sprite = new PIXI.Sprite(AudioManager.muted ? mutedTexture : unmutedTexture);
	sprite.position.set(SceneManager.renderer.width - 48 - 10, 10);
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