var Ship = function(x, y) {
    var texture = PIXI.Texture.fromImage("resources/space_ship.png");
    PIXI.Sprite.call(this, texture, 640, 480);

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position.x = x;
    this.position.y = y;

    this.physicsAttrs = {
        shouldAccelerate: false,
        position: new PIXI.Point(0, 0),
        velocity: new PIXI.Point(0, 0),
        rotationSign: 1
    };

};


Ship.ACCELERATION = 10;


Ship.ROTATION_SPEED = Math.PI / 90;


Ship.FRICTION = 0.99;


Ship.prototype = Object.create(PIXI.Sprite.prototype);


Ship.prototype.setAngle = function(angle) {
    this.rotation = angle;
};


Ship.prototype.getAngle = function() {
    return this.rotation;
};


Ship.prototype.accelerate = function() {
    this.physicsAttrs.shouldAccelerate = true;
};


Ship.prototype.update = function() {

    if (this.rotation <= - 1 / 2 * Math.PI) {
        this.physicsAttrs.rotationSign = 1;
    } else if (this.rotation >= 1 / 2 * Math.PI) {
        this.physicsAttrs.rotationSign = -1;
    }
    this.rotation += this.physicsAttrs.rotationSign * Ship.ROTATION_SPEED;

    if (this.physicsAttrs.shouldAccelerate) {
        this.physicsAttrs.shouldAccelerate = false;
        this.physicsAttrs.velocity.x += -Ship.ACCELERATION * Math.sin(this.rotation);
        this.physicsAttrs.velocity.y +=  Ship.ACCELERATION * Math.cos(this.rotation);
    }

    this.physicsAttrs.position.x += this.physicsAttrs.velocity.x;
    this.physicsAttrs.position.y += this.physicsAttrs.velocity.y;

    this.physicsAttrs.velocity.x = Ship.FRICTION * this.physicsAttrs.velocity.x;
    this.physicsAttrs.velocity.y = Ship.FRICTION * this.physicsAttrs.velocity.y;

    return this.physicsAttrs.position;
};