var AudioManager = {
	theme: null,
	sounds: null,
	init: function (onProgress) {
		this.theme = new buzz.sound('asset/audio/theme.mp3', { loop: true });
		this.sounds = new buzz.group(this.theme);
		var i = 0;
		this.sounds.bind('canplaythrough', function () {
			if(onProgress)
				onProgress(++i);
		});
		this.sounds.load();
		return this.sounds.getSounds().length;
	},
	mute: function (mute) {
		if(mute)
			this.sounds.mute();
		else
			this.sounds.unmute();
	}
};