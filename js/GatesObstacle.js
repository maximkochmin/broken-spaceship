var GatesObstacle = function(x, y, xOffset, spriteId, spriteInfo) {
    Obstacle.call(this, x, y, xOffset, spriteId, spriteInfo);
};


GatesObstacle.prototype = Object.create(Obstacle.prototype);


GatesObstacle.prototype.setSprite = function(objectPool, container) {
    Obstacle.prototype.setSprite.call(this, objectPool, container);
    this.sprite.position.x = 0;
};


GatesObstacle.prototype.collides = function(point) {
    if (this.sprite === null) {
        return false;
    }
    var w = this.spriteInfo.width;
    var h = this.spriteInfo.height;
    var w1 = this.spriteInfo.leftBlockWidth;
    var w2 = this.spriteInfo.rightBlockWidth;
    var x = point.x + w / 2;

    var r = (
        ((x > 0 && x < w1) || (x > w2 && x < w)) &&
        (point.y > this.position.y - h && point.y < this.position.y)
    );

    return r;
};;