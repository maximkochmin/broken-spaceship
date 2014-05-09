var Obstacle = function(x, y, xOffset, spriteId, spriteInfo) {

    this.position = {
        x: x,
        y: y
    };
    this.xOffset = xOffset;
    this.spriteId = spriteId;
    this.spriteInfo = spriteInfo;
    this.sprite = null;
};


Obstacle.prototype.setSprite = function(objectPool, container) {
    if (this.sprite !== null) return;
    this.sprite = objectPool.borrow(this.spriteId);
    this.sprite.position.x = this.xOffset + this.position.x * this.spriteInfo.spriteOptions.scale.x;
    container.addChildAt(this.sprite, 2);
};


Obstacle.prototype.unsetSprite = function(objectPool, container) {
    if (this.sprite === null) return;
    container.removeChild(this.sprite);
    objectPool.return(this.spriteId, this.sprite);
    this.sprite = null;
};


Obstacle.prototype.setViewportY = function(y) {
    this.sprite.position.y = y;
};


Obstacle.prototype.collides = function(point) {
    if (this.sprite === null) {
        return false;
    }
    var w = this.spriteInfo.width / 2;
    var h = this.spriteInfo.height / 2;
    var r = Math.abs(point.x - this.position.x) <= w &&
           Math.abs(point.y - (this.position.y - h)) <= h;
    return r;
};