var Background = function(width, height) {
    var texture = PIXI.Texture.fromImage("resources/space_background.png");
    PIXI.TilingSprite.call(this, texture, width, height);
    this.position.x = 0;
    this.position.y = 0;

    this.reset();
};


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