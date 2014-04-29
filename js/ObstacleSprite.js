var ObstacleSprite = function() {
    var texture = PIXI.Texture.fromImage("resources/obstacle_prototype.png");
    PIXI.Sprite.call(this, texture, Obstacle.WIDTH, Obstacle.HEIGHT);

    this.position.x = 0;
    this.position.y = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

};


ObstacleSprite.prototype = Object.create(PIXI.Sprite.prototype);
