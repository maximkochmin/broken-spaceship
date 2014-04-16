var Background = function(width, height) {
    var texture = PIXI.Texture.fromImage("resources/space_background.png");
    PIXI.TilingSprite.call(this, texture, width, height);

    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;
    this.viewportX = 0;
};


Background.prototype = Object.create(PIXI.TilingSprite.prototype);


Background.prototype.setViewportPosition = function(point) {
    this.tilePosition = point;
};

Background.prototype.getViewportPosition = function() {
    return this.tilePosition;
};