function HorizontalBar(x, y, width, height) {
    var bar = new PIXI.Graphics();
    bar.beginFill(0xFFFFFF, 0.9);
    bar.drawRect(x, y, width, height);
    return bar;
}

function generateHorizontalBarSection(width, height) {
    function HorBarSection() {
        var offset = new PIXI.Point(30, 50);
        Section.call(this, width + offset.x);

        this.direction = 1;
        
        this.upperLimit = offset.y;
        this.lowerLimit = viewportHeight - offset.y;
        console.log("Before splicing:", this.objects);
        this.objects.splice(0);

        this.container = new PIXI.DisplayObjectContainer();
        var barHeight = Math.random() * (height - 100) + 100;
        this.ypos = Math.random() * (viewportHeight - height);
        this.bar = new HorizontalBar(offset.x, this.ypos, width - offset.x, barHeight);
        this.container.addChild(this.bar);
    }

    HorBarSection.weight = 1;

    HorBarSection.prototype = new Section();
    HorBarSection.prototype.constructor = Section;

    HorBarSection.prototype.collided = function () {
        SceneManager.getScene('game').gameOver();
    }

    HorBarSection.prototype.checkForCollisionsWith = function(sloth) {
        if (sloth.collidesWithRect(this.bar))
            SceneManager.getScene('game').gameOver();
    }

    HorBarSection.prototype.update = function() {
        var bar = this.bar;
        var actualY = this.ypos + bar.y;

        if (bar.height < (this.lowerLimit - this.upperLimit)) {
            bar.y += this.direction
            switch(this.direction) {
                case -1:
                    if (actualY > this.upperLimit) { 
                        bar.y += this.direction 
                    } else { 
                        this.direction *= -1 
                    }
                    break;
                case 1:
                    if (actualY + bar.height < this.lowerLimit) { 
                        bar.y += this.direction
                    } else { 
                        this.direction *= -1 
                    }
                    break;
            }
        }
    }

    return HorBarSection;
}