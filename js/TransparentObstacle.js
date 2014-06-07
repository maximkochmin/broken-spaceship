var TransparentObstacle = function(x, y, xOffset, spriteId, spriteInfo) {
    Obstacle.call(this, x, y, xOffset, spriteId, spriteInfo);
};


TransparentObstacle.prototype = Object.create(Obstacle.prototype);


TransparentObstacle.prototype.collides = function(point) {
    return false;
};