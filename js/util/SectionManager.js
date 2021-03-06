/*

 The section manager is used to provide the game with dynamic content.

 The section queue contains the current sections. New instantiations of the section classes can be added to this queue,
 and once the player moves past them they are removed from the section queue.

 The functions used are pretty self-explanatory.

 */

function SectionManager(viewportWidth, viewportHeight, player, sections) {
	this.viewportWidth = viewportWidth;
	this.viewportHeight = viewportHeight;
	this.sections = sections.sort(function (a, b) {
		return a.weight - b.weight;
	});
	this.maxWeight = this.sections[this.sections.length - 1].weight;
	this.sectionQueue = [];
	this.container = new PIXI.DisplayObjectContainer();
	this.player = player;
}

SectionManager.prototype = {
	update: function (velocity) {
		if(this.sectionQueue.length === 0) {
			this.enqueueSection(new EmptySection(viewportWidth * 0.5));
		} else {
			for (var i = 0; i < this.sectionQueue.length; i++) {
				var section = this.sectionQueue[i];
				section.container.x -= velocity.x;
				section.update();

				// if the last section in the queue is visible or the queue is empty, add a new section
				if((i === this.sectionQueue.length - 1 && section.isVisible(this)) || this.sectionQueue.length === 0) {
					this.increaseQueue();
					break;
				}

				// if this section is further away than the viewport width remove it
				if (section.container.x < -viewportWidth) {
					this.dequeueSection(section);
					i--;
				}
				
				// check if player is inside a section
				var p = this.player.position;
				if (!section.playerIsInside && p.x > section.container.x && p.x < section.container.x + section.width) {
					section.playerIsInside = true;
					section.playerEntered();
				} else if (section.playerIsInside && (p.x > section.container.x + section.width || p.x < section.container.x)) {
					section.playerIsInside = false;
					section.playerExited();
				}
			}
		}
	},

	// The section to be added is randomly selected using weights defined for each section.
	// The weight defines the probability at which it is selected.
	increaseQueue: function () {
		var offset = 0;
		if(this.sectionQueue.length > 0) {
			var lastSection = this.sectionQueue[this.sectionQueue.length - 1];
			offset = lastSection.container.position.x + lastSection.width;
		}
		var r = Math.random() * this.maxWeight;
		var randomSection;
		var c = 0;
		for(var i = 0; i < this.sections.length; i++) {
			var s = this.sections[i];
			c += s.weight;
			if (r < c) {
				randomSection = new s;
				break;
			}
		}
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
		this.container.removeChild(section.container);
	},
	reset: function() {
		this.container.removeChildren();
		this.sectionQueue.splice(0, this.sectionQueue.length);
	},
	canMoveBackwards: function () {
		return this.sectionQueue.length === 0 || this.sectionQueue[0].container.position.x < 0;
	}
};

/*

The abstract class Section is used as a base class for all the sections that
can be added to the section queue, eg. the EnemySection that contains the owl.

 */

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
		this.objects.forEach(function (e) { e.update(); })
	},
	enqueued: function () {},
	dequeued: function () {},
	playerEntered: function () {},
	playerExited: function () {},
	checkForCollisionsWith: function (sloth) {}
};