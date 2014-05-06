
var ObstacleSprite = function(width, height, texture, options) {

    texture = PIXI.Texture.fromImage(texture);
    PIXI.Sprite.call(this, texture, width, height);

    // default options
    this.anchor.x = 0.5;
    this.anchor.y = 0;

    if (typeof options === "object") {
        for (var i in options) {
            this[i] = options[i];
        }
    }


};


ObstacleSprite.prototype = Object.create(PIXI.Sprite.prototype);
