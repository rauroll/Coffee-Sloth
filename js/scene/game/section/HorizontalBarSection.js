/**
 * Created by Olli on 21/12/14.
 */
function HorizontalBar(x, y, width, height) {


    var bar = new PIXI.Graphics();
    bar.beginFill(0x000000);
    bar.drawRect(x, y, width, height);
    return bar;
}

function generateHorizontalBarSection(width, height, viewHeight) {
    function HorBarSection() {
        Section.call(this, width);
        this.direction = 1;
        var offsety = 100;
        this.topLimit = offsety;
        var offsetx = 25;
        this.lowerLimit = viewHeight - offsety;
        this.objects.splice(0);
        var container = new PIXI.DisplayObjectContainer();
        var barHeight = Math.max(100, Math.random() * height);
        this.ypos = Math.random() * (viewHeight - height);
        var bar = new HorizontalBar(offsetx, this.ypos, width - offsetx, barHeight);
        container.addChild(bar);


        this.container = container;
    }



    HorBarSection.weight = 1;

    HorBarSection.prototype = new Section();
    HorBarSection.prototype.constructor = Section;

    HorBarSection.prototype.collided = function () {
        SceneManager.getScene('game').gameOver();
    }

    HorBarSection.prototype.checkForCollisionsWith = function(sloth) {
        var bar = this.container.children[0];
        if (sloth.collidesWithRect(bar)) {
            SceneManager.getScene('game').gameOver();
        }

    }

    HorBarSection.prototype.update = function() {


        var bar = this.container.children[0];
        var actualY = this.ypos + bar.y;

        if (bar.height < (this.lowerLimit - this.topLimit)) {
            bar.y += this.direction
            switch(this.direction) {
                case -1:
                    if (actualY > this.topLimit) { bar.y += this.direction } else { this.direction *= -1};
                    break;
                case 1:
                    if (actualY + bar.height < this.lowerLimit) { bar.y += this.direction} else { this.direction *= -1};
                    break;
            }
        }
    }

    return HorBarSection;
}

