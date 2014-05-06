
function GameScreen(width, height, textColor) {

    PIXI.DisplayObjectContainer.call(this);

    this.width = width;
    this.height = height;


    this.tileScale = this.width / GameScreen.WIDTH;

    this.background = new Background(width, height);
    this.addChild(this.background);

    this.scoreDisplay = new ScoreDisplay(width - 10, 0, width, textColor);
    this.addChild(this.scoreDisplay);

    this.shipPosition = {
        x: width * 0.5,
        y: height * 0.8
    };
    this.ship = new Ship(this.shipPosition, this.tileScale);
    this.addChild(this.ship);

    this.objectPool = new ObjectPool(this.tileScale);

    this.obstacles = [];

    this.setInteractive(true);
    this.touchstart = this.accelerate.bind(this);
    this.mousedown = this.accelerate.bind(this);

}


GameScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);



GameScreen.WIDTH = 610;


GameScreen.prototype.generateObstacles = function() {
    var x, obstacle, spriteId, spriteInfo;
    var obstacleIds = Object.keys(ObjectPool.OBSTACLES);
    for (var i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].unsetSprite(this.objectPool, this);
    }
    this.obstacles = [];
    for (var y = 0; y < this.height * 1000 / this.tileScale; y += this.height / this.tileScale / 4) {
        if (y === 0) continue;
        x = Math.random() * this.width | 0 - this.width * 0.5;
        spriteId = obstacleIds[Math.random() * obstacleIds.length | 0];
        spriteInfo = ObjectPool.OBSTACLES[spriteId];
        this.obstacles.push(new spriteInfo.handler(x, y, this.width * 0.5, spriteId, spriteInfo));
    }
};



GameScreen.prototype.reset = function() {
    this.scoreDisplay.setScore(0);

    this.generateObstacles();
    this.ship.reset();
    this.background.reset();

    this.gameIsFinished = false;
};


GameScreen.prototype.accelerate = function() {
    this.ship.accelerate();
};


GameScreen.prototype.updateObstacles = function() {

    var minY = this.ship.physicsAttrs.position.y - (this.height - this.shipPosition.y) / this.tileScale;
    var maxY = this.ship.physicsAttrs.position.y + this.shipPosition.y / this.tileScale;


    var visibleObstacles = this.obstacles.filter(function(el) {
        return (el.position.y <= maxY);
    });
    var o;
    var p = this.ship.physicsAttrs.position;
    for (var i = 0; i < visibleObstacles.length; i++) {
        o = visibleObstacles[i];

        if (o.position.y < minY && o.sprite !== null) {

            o.unsetSprite(this.objectPool, this);
        } else if (o.position.y >= minY) {
            o.setSprite(this.objectPool, this);
            o.setViewportY((maxY - o.position.y) * this.tileScale);
        }

        if (o.collides(p)) {

            this.gameIsFinished = true;
            break;
        }

    }
};


GameScreen.prototype.update = function() {

    var p = this.ship.update();

    if (Math.abs(p.x) >= GameScreen.WIDTH / 2) {
        this.gameIsFinished = true;
    }

    this.updateObstacles();
    this.scoreDisplay.setScore(parseInt(p.y * 0.01, 10));

    this.background.setViewportPosition(0, p.y);

};
