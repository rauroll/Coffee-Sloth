function SectionManager(viewportWidth, viewportHeight, player, sections) {
	this.viewportWidth = viewportWidth;
	this.viewportHeight = viewportHeight;
	this.sections = sections;
	this.sectionQueue = [];
	this.currentSection;
	this.container = new PIXI.DisplayObjectContainer();
	this.player = player;
}

SectionManager.prototype = {
	update: function (velocity) {
		if(this.sectionQueue.length === 0) {
			this.increaseQueue();
		} else {
			for(var i = 0; i < this.sectionQueue.length; i++) {
				var section = this.sectionQueue[i];
				section.container.x -= velocity.x;
				section.update();

				if((i === this.sectionQueue.length - 1 && section.isVisible(this)) || this.sectionQueue.length === 0) {
					this.increaseQueue();
					break;
				}
				if (section.container.x < -1000) {
					this.dequeueSection(section);
					i--;
				}
				
				if (!section.playerIsInside && this.player.position.x > section.container.x && this.player.position.x < section.container.x + section.width) {
					section.playerIsInside = true;
					section.playerEntered();
				} else if (section.playerIsInside && this.player.position.x > section.container.x + section.width) {
					section.playerIsInside = false;
					section.playerExited();
				}
			}
		}
	},
	increaseQueue: function () {
		var offset = 0;
		if(this.sectionQueue.length > 0) {
			var lastSection = this.sectionQueue[this.sectionQueue.length - 1];
			offset = lastSection.container.position.x + lastSection.width;
		}
		var randomSection = new this.sections[Math.floor(Math.random() * this.sections.length)];
		randomSection.container.position.x = offset;
		this.enqueueSection(randomSection);
	},
	enqueueSection: function (section) {
		section.enqueued();
		this.sectionQueue.push(section);
		this.container.addChild(section.container);
	},
	dequeueSection: function (section) {
		section.dequeued();
		this.sectionQueue.shift();
		//this.container.removeChild(section.container);
	},
	removeSectionAt: function(i) {
		this.sectionQueue.splice(i, 1);
	},
	reset: function() {
		this.container.removeChildren();
		this.sectionQueue.splice(0, this.sectionQueue.length);
	}
};

function Section(width) {
	this.width = width;
	this.container;
	this.objects = [];
	this.playerIsInside = false;
}

Section.prototype = {	
	isVisible: function (sectionManager) {
		return this.container.position.x < sectionManager.viewportWidth;
	},
	update: function () {
		this.objects.forEach(function(e) {e.update();})
	},
	enqueued: function () {},
	dequeued: function () {},
	playerEntered: function () {},
	playerExited: function () {}
};