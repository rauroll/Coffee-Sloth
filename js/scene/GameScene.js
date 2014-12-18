var rotationStep = 8;
var airResistance = -0.01;
var gravity = 0.15;
var backgroundVelocity = 0.1;

function GameScene() {
	this.name = 'game';
	this.scene = new PIXI.DisplayObjectContainer();

	var acceleration = 0;
	var velocity = new PIXI.Point(0, 0);
	var removeRotationBoost = false;
	var rotationVelocity = 0;
	var backgroundContainer = null;
	var throttleKeyAction = new KeyAction([38], function () {
		acceleration = 0.6;
	}, function () {
		acceleration = 0;
	});
	var gameIsOver = false;
	var t = this;
	var coffees;
	var enemies;


	this.keyboardManager = new KeyboardInputManager([
		new KeyAction([37, 39], function (code) {
			rotationVelocity = code === 39 ? rotationStep : -rotationStep;
			removeRotationBoost = false;
			interval = setInterval(function () {
				rotationVelocity *= 1.07;
			}, 50);
		}, function () {
			removeRotationBoost = true;
			clearInterval(interval);
			interval = false;
		}),
		new KeyAction([27], null, function () {
			SceneManager.changeScene('main');
		}),
		new KeyAction([13], null, function () {
			if(gameIsOver)
				t.newGame();
		})
	]);

	var slothFrameIndex = 1;
	var slothFrameOffset = 0;
	this.update = function () {
		if (coffees.length > 0) {
			console.log(coffees)
		}

		if (throttleKeyAction.active) {
			if (slothFrameOffset > 3) {
				slothFrameIndex = slothFrameIndex % 4 + 1;
				slothFrameOffset = 0;
			}
			sloth.setTexture(PIXI.Texture.fromImage('asset/image/sloth/slothsprite' + slothFrameIndex + '.png'));
			slothFrameOffset++;
		}
		else
			sloth.setTexture(PIXI.Texture.fromImage('asset/image/sloth/slothsprite_nofire.png'));

		velocity.x += acceleration * Math.sin(sloth.rotation + 1) + airResistance * velocity.x;
		velocity.y -= acceleration * Math.cos(sloth.rotation + 1) - gravity - airResistance * velocity.y;
		far.tilePosition.x -= backgroundVelocity * velocity.x;
		mid.tilePosition.x = far.tilePosition.x / 0.2;
		floor.tilePosition.x = far.tilePosition.x / 0.1

		coffees.update(backgroundVelocity * velocity.x / 0.1);
		enemies.update(backgroundVelocity * velocity.x / 0.1);

		sloth.position.y += velocity.y;

		sloth.rotation += rotationVelocity / 200;

		if(removeRotationBoost && rotationVelocity !== 0)
			rotationVelocity += rotationVelocity > 0 ? -0.5 : 0.5;

		if(coffeeBarInside.scale.x > 0 && sloth.y < 410)
			coffeeBarInside.scale.x -= 0.001;
		else if(!gameIsOver)
			gameOver();
	};

	this.init = function () {
		this.keyboardManager.add(throttleKeyAction);

		coffees = new CoffeePool();
		enemies = new EnemyPool();

		var backArrow = new PIXI.Sprite.fromImage('asset/image/back.png');
		backArrow.position.set(12, 12);
		backArrow.alpha = 0.5;
		backArrow.interactive = true;
		backArrow.click = function () { SceneManager.changeScene('main'); };
		backArrow.mouseover = function () { backArrow.alpha = 1; };
		backArrow.mouseout = function () { backArrow.alpha = 0.6; };

		backgroundContainer = new PIXI.DisplayObjectContainer();
		backgroundContainer.addChild(far);
		backgroundContainer.addChild(mid);
		backgroundContainer.addChild(floor);



		this.scene.addChild(backgroundContainer);
		this.scene.addChild(sloth);
		this.scene.addChild(coffeeBar);
		this.scene.addChild(overlay);
		this.scene.addChild(backArrow);
		this.scene.addChild(coffees);
		this.scene.addChild(enemies);





	};
	this.attach = function () {
		this.newGame();
	};
	var boostCoffeeLevel = function (amount) {
		amount = amount || 0.2;
		coffeeBarInside.scale.x = Math.min(1, coffeeBarInside.scale.x + amount);
	};
	var gameOver = function () {
		gameIsOver = true;
		overlay.visible = true;
		throttleKeyAction.enabled = false;
		throttleKeyAction.onKeyUp();
		coffeeBar.visible = false;
	};
	this.newGame = function () {
		coffeeBarInside.scale.x = 1;
		sloth.position.set(250, 200);
		acceleration = 0;
		velocity.set(0, 0);
		sloth.rotation = 0;

		gameIsOver = false;
		overlay.visible = false;
		throttleKeyAction.enabled = true;
		coffeeBar.visible = true;
	};
};

CScene.extendWith(GameScene);

