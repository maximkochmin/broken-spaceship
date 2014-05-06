var Background = function(width, height) {
    var texture = PIXI.Texture.fromImage("resources/monokai_background.png");
    PIXI.TilingSprite.call(this, texture, width, height);

    var scale = width / Background.TEXTURE_WIDTH;
    this.tileScale.x = scale;
    this.tileScale.y = scale;

    this.position.x = 0;
    this.position.y = 0;

    this.reset();
};


Background.TEXTURE_WIDTH = 610;


Background.prototype = Object.create(PIXI.TilingSprite.prototype);


Background.prototype.reset = function() {
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;
};


Background.prototype.setViewportPosition = function(x, y) {
    this.tilePosition.x = x;
    this.tilePosition.y = y;
};


Background.prototype.getViewportPosition = function() {
    return this.tilePosition;
};