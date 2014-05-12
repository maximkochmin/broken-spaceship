function GameScreen(width, height, audio) {
    PIXI.DisplayObjectContainer.call(this);

    this.width = width;
    this.height = height;
    this.audio = audio;

    this.tileScale = this.width / GameScreen.WIDTH;

    this.background = new Background(width, height);
    this.addChildAt(this.background, 0);

    this.shipPosition = {
        x: width * 0.5,
        y: height * 0.8
    };
    this.ship = new Ship(this.shipPosition, this.tileScale, audio);
    this.addChildAt(this.ship, 1);

    this.scoreDisplay = new ScoreDisplay(width - 10, 0, width);
    this.addChildAt(this.scoreDisplay, 2);

    this.objectPool = new ObjectPool(this.tileScale);

    this.obstacles = [];

}


GameScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);


GameScreen.WIDTH = 610;


GameScreen.prototype.addObstacles = function(startY, howMany, gapMin, gapMax) {
    var x, y, spriteId, spriteInfo, handler;
    var obstacleIds = Object.keys(ObjectPool.OBSTACLES);

    obstacleIds.splice(obstacleIds.indexOf('hint'), 1);

    y = startY;
    for (var i = 0; i < howMany; i++) {
        x = Math.random() * this.width | 0;
        x -= this.width * 0.5;
        spriteId = obstacleIds[Math.random() * obstacleIds.length | 0];
        spriteInfo = ObjectPool.OBSTACLES[spriteId];
        y += spriteInfo.height;
        y += gapMin;
        y += Math.random() * (gapMax - gapMin) | 0;
        handler = new spriteInfo.handler(x, y, this.width * 0.5, spriteId, spriteInfo);
        this.obstacles.push(handler);
    }
};


GameScreen.prototype.generateObstacles = function() {
    for (var i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].unsetSprite(this.objectPool, this);
    }
    this.obstacles = [];
    var spriteInfo = ObjectPool.OBSTACLES.hint;
    var handler = new spriteInfo.handler(
        0,
        this.height * 0.6 / this.tileScale,
        this.width * 0.5,
        'hint',
        spriteInfo
    );
    this.obstacles.push(handler);
};


GameScreen.prototype.reset = function() {
    this.passedObstacles = 0;
    this.scoreDisplay.setScore(0);
    this.generateObstacles();
    this.ship.reset();
    this.background.reset();
    this.gameIsFinished = false;
};


GameScreen.prototype.accelerate = function() {
    this.ship.accelerate();
};


GameScreen.prototype.gameOver = function() {
    this.audio.playSound('resources/ship_crash.wav');
    this.gameIsFinished = true;
};


GameScreen.prototype.updateObstacles = function() {

    var minY = this.ship.physicsAttrs.position.y - (this.height - this.shipPosition.y) / this.tileScale;
    var maxY = this.ship.physicsAttrs.position.y + this.shipPosition.y / this.tileScale;

    if (this.passedObstacles > this.obstacles.length - 2) {
        this.addObstacles(maxY + 200, 50, 100, 500);
    }

    var visibleObstacles = this.obstacles.filter(function(el) {
        return (el.position.y <= maxY + 200);
    });
    var o;
    var p = this.ship.physicsAttrs.position;
    for (var i = 0; i < visibleObstacles.length; i++) {
        o = visibleObstacles[i];

        if (o.position.y < minY && o.sprite !== null) {
            this.passedObstacles++;
            o.unsetSprite(this.objectPool, this);
        } else if (o.position.y >= minY) {
            o.setSprite(this.objectPool, this);
            o.setViewportY((maxY - o.position.y) * this.tileScale);
        }

        if (o.collides(p)) {
            this.gameOver();
            break;
        }

    }
};


GameScreen.prototype.update = function() {

    var p = this.ship.update();
    if (Math.abs(p.x) >= GameScreen.WIDTH / 2 + 20) {
        this.gameOver();
    }

    this.updateObstacles();
    this.scoreDisplay.setScore(parseInt(p.y * 0.01, 10));
    this.background.setViewportPosition(0, p.y);

};
