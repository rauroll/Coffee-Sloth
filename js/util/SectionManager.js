function SectionManager(viewportWidth, viewportHeight, sections) {
	this.viewportWidth = viewportWidth;
	this.viewportHeight = viewportHeight;
	this.sections = sections;
	this.sectionQueue = [];
	this.currentSection;
	this.container = new PIXI.DisplayObjectContainer();
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
			}
		}
	},
	increaseQueue: function () {
		var offset = 0;
		if(this.sectionQueue.length > 0) {
			var lastSection = this.sectionQueue[this.sectionQueue.length - 1];
			offset = lastSection.container.position.x + lastSection.width;
		}
		var randomSection = this.sections[Math.floor(Math.random() * this.sections.length)].clone();
		randomSection.container.position.x = offset;
		this.enqueueSection(randomSection);
	},
	enqueueSection: function (section) {
		section.enqueued();
		this.sectionQueue.push(section);
		this.container.addChild(section.container);
	}
};

function Section(width) {
	this.width = width;
	this.container;
}

Section.prototype = {	
	isVisible: function (sectionManager) {
		return this.container.position.x < sectionManager.viewportWidth;
	},
	update: function () {},
	enqueued: function () {},
	getWidth: function () {
		return this.container.getBounds().width;
	},
	getContainer: function () {},
	clone: function () {
		var newSection = new Section();
		newSection.container = this.getContainer();
		newSection.width = this.width;
		return newSection;
	}
};