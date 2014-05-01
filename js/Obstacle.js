var Obstacle = function(x, y) {
    this.position = {
        x: x,
        y: y
    };
    this.viewportY = 0;
    this.sprite = null;
};


Obstacle.WIDTH = 256;


Obstacle.HEIGHT = 128;


Obstacle.prototype.setSprite = function(sprite) {
    this.sprite = sprite;
    this.sprite.position.x = this.position.x;
};


Obstacle.prototype.setViewportY = function(y) {
    this.sprite.position.y = y;
};
