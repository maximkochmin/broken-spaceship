var StarObstacle = function(x, y, xOffset, spriteId, spriteInfo) {
    Obstacle.call(this, x, y, xOffset, spriteId, spriteInfo);
};


StarObstacle.prototype = Object.create(Obstacle.prototype);


StarObstacle.prototype.collides = function(point) {
    if (this.sprite === null) {
        return false;
    }
    var w = this.spriteInfo.width / 2;
    var h = this.spriteInfo.height / 2;
    var r = Math.abs(point.x - this.position.x) / w + Math.abs(point.y - (this.position.y - h)) / h
    return r < 1;
};