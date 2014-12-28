var enemyAttackVelocity = 6;
var enemyAttackRange = 400;
var enemyFPS = 7;

function Enemy (sectionWidth) {
    this.orbitalRadius = 200;
    this.sprite = PIXI.Sprite.fromImage("asset/image/owl/owl1.png");
    this.sprite.pivot.set(this.sprite.width / 2, this.sprite.height / 2);
    this.sprite.position.x = sectionWidth / 2 + this.orbitalRadius;
    this.sprite.position.y = viewportHeight / 2;
    this.orbitalStepper = 0;
    this.playerSeen = false;
    this.followCounter = 0;
    this.frameIndex = 0;
    var d = new Date();
    this.lastTime = d.getTime();
}

function EnemySection() {

    Section.call(this, 1000);
    var enemy = new Enemy(this.width);
    var container = new PIXI.DisplayObjectContainer();
    container.addChild(enemy.sprite);
    this.objects.push(enemy);
    this.container = container;

}

EnemySection.weight = 1;

EnemySection.prototype = new Section();

EnemySection.prototype.constructor = Section;

EnemySection.prototype.update = function () {
    var enemy = this.objects[0];
    var d = new Date();
    var currentTime = d.getTime();
    var dt = currentTime - enemy.lastTime;
    if (dt > 1000/enemyFPS) {
        enemy.lastTime = currentTime;
        (enemy.frameIndex < 3) ? enemy.frameIndex++ : enemy.frameIndex = 1;
        enemy.sprite.setTexture(PIXI.Texture.fromImage("asset/image/owl/owl" + enemy.frameIndex + ".png"));
    }
    var slothPos = SceneManager.getScene('game').getSloth().getLocation();
    var actualEnemyPosition = enemy.sprite.toGlobal(new PIXI.Point(0, 0));
    var distance = this.distanceFromSloth(slothPos, actualEnemyPosition);
    if (distance <= enemyAttackRange && !enemy.playerSeen) {
        enemy.playerSeen = true;
    }
    if (enemy.playerSeen && enemy.followCounter < 500) {
        var coeffx = Math.sqrt(Math.pow(distance, 2) - Math.pow(slothPos.y - actualEnemyPosition.y, 2)) / distance;
        if (slothPos.x < actualEnemyPosition.x)
            coeffx *= -1;
        var coeffy = Math.sqrt(Math.pow(distance, 2) - Math.pow(slothPos.x - actualEnemyPosition.x, 2)) / distance;
        if (slothPos.y < actualEnemyPosition.y)
            coeffy *= -1;
        enemy.sprite.x += enemyAttackVelocity * coeffx;
        enemy.sprite.y += enemyAttackVelocity * coeffy;
        enemy.followCounter++;
        if (enemy.followCounter == 500) {
            enemy.followCounter = 0;
            enemy.playerSeen = false;
        }
    } else {
        enemy.sprite.position.x = this.width / 2 + Math.cos(enemy.orbitalStepper) * enemy.orbitalRadius;
        enemy.sprite.position.y = viewportHeight / 2 + Math.sin(enemy.orbitalStepper) * enemy.orbitalRadius;

        enemy.orbitalStepper += 0.01 * Math.PI;
        if (enemy.orbitalStepper >= 2 * Math.PI)
            enemy.orbitalStepper = 0;
    }

};

EnemySection.prototype.distanceFromSloth = function(slothPos, enemy) {
    return Math.sqrt(Math.pow(slothPos.x - enemy.x, 2) + Math.pow(slothPos.y - enemy.y, 2));
}

EnemySection.prototype.checkForCollisionsWith = function(sloth) {
    for (var j = 0; j < this.objects.length; j++) {
        var obj = this.objects[j];

        if (sloth.collidesWithRect(obj.sprite, 1)) {
            SceneManager.getScene('game').gameOver();

        }
    }
}