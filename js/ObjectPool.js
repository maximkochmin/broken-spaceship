var ObjectPool = function() {
    this.objects = {};
    // this.createObstacleSprites();
};


ObjectPool.prototype.createObstacleSprites = function() {
    this.objects.obstacle = [];
    for (var i = 0; i < 10; i++) {
        this.objects.obstacle.push(new ObstacleSprite());
    }
};


ObjectPool.prototype.borrow = function(type) {
    if (!(type in this.objects)) {
        throw new TypeError('Objects of type "' + type + '" do not exist');
    }
    if (this.objects[type].length <= 0) {
        throw new Error('We\'re out of "' + type + '"');
    }
    return this.objects[type].pop();
};


ObjectPool.prototype.return = function(type, obj) {
    this.objects[type].push(obj);
};