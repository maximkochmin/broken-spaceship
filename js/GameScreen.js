function GameScreen(width, height, textColor) {
    PIXI.DisplayObjectContainer.call(this);

    this.width = width;
    this.height = height;

    this.background = new Background(width, height);
    this.addChild(this.background);

    this.scoreDisplay = new ScoreDisplay(width - 10, 0, width, textColor);
    this.addChild(this.scoreDisplay);

    this.ship = new Ship(width / 2, height * 4 / 5, width / 20);
    this.addChild(this.ship);

    this.objectPool = new ObjectPool();

    this.obstacles = [];
    for (y = 2000; y < GameScreen.FINISH; y+=300 + Math.random() * 1000 | 0) {
        this.obstacles.push(new Obstacle(
            Math.random() * width | 0,
            y
        ));
    }

}


GameScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);


GameScreen.FINISH = 50000;


GameScreen.prototype.reset = function() {
    this.scoreDisplay.setScore(0);
    this.ship.reset();
    this.background.reset();
    var o;
    for (var i = 0; i < this.obstacles.length; i++) {
        o = this.obstacles[i];
        if (o.sprite !== null) {
            this.removeChild(o.sprite);
            this.objectPool.return('obstacle', o.sprite);
            o.sprite = null;
        }
    }

    this.gameIsFinished = false;
};


GameScreen.prototype.accelerate = function() {
    this.ship.accelerate();
};


GameScreen.prototype.updateObstacles = function() {
    var minY = this.ship.physicsAttrs.position.y - Main.HEIGHT / 5;
    var maxY = this.ship.physicsAttrs.position.y + Main.HEIGHT * 4 / 5;
    var visibleObstacles = this.obstacles.filter(function(el) {
        return (el.position.y <= maxY);
    });
    var o;
    var p = this.ship.physicsAttrs.position;
    for (var i = 0; i < visibleObstacles.length; i++) {
        o = visibleObstacles[i];

        if (o.position.y < minY && o.sprite !== null) {
            this.removeChild(o.sprite);
            this.objectPool.return('obstacle', o.sprite);
            o.sprite = null;
        } else if (o.position.y >= minY) {
            if (o.sprite === null) {
                o.setSprite(this.objectPool.borrow('obstacle'));
                this.addChild(o.sprite);
            }
            o.setViewportY(maxY - o.position.y);
        }


        if (
            p.x >= o.position.x - Obstacle.WIDTH / 2 && p.x <= o.position.x + Obstacle.WIDTH / 2 && p.y >= o.position.y - Obstacle.HEIGHT / 2 && p.y <= o.position.y + Obstacle.HEIGHT / 2
        ) {
            this.gameIsFinished = true;
            break;
        }

    }
};


GameScreen.prototype.update = function() {

    var p = this.ship.update();
    if (p.x <= 0 || p.x >= this.width) {
        this.gameIsFinished = true;
    }

    this.updateObstacles(p);
    this.scoreDisplay.setScore(parseInt(p.y / 100, 10));
    this.background.setViewportPosition(0, p.y);

};
