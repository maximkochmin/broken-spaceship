
var Ship = function(shipPosition, scale) {
    var textures = [
        new PIXI.Texture.fromFrame("monokai_ship0.png"),
        new PIXI.Texture.fromFrame("monokai_ship1.png"),
        new PIXI.Texture.fromFrame("monokai_ship2.png"),
        new PIXI.Texture.fromFrame("monokai_ship3.png"),
        new PIXI.Texture.fromFrame("monokai_ship4.png"),
        new PIXI.Texture.fromFrame("monokai_ship5.png"),
        new PIXI.Texture.fromFrame("monokai_ship4.png"),
        new PIXI.Texture.fromFrame("monokai_ship3.png"),
        new PIXI.Texture.fromFrame("monokai_ship2.png"),
        new PIXI.Texture.fromFrame("monokai_ship1.png"),
        new PIXI.Texture.fromFrame("monokai_ship0.png")

    ];

    PIXI.MovieClip.call(this, textures);


    this.xOffset = shipPosition.x;

    this.anchor.x = 0.5;
    this.anchor.y = 0.25;
    this.position.x = shipPosition.x;
    this.position.y = shipPosition.y;
    this.scale.x = scale;
    this.scale.y = scale;
    this.animationSpeed = 0.6;
    this.loop = false;


    this.reset();

};


Ship.ACCELERATION = 10;


Ship.ROTATION_SPEED = Math.PI / 45;


Ship.FRICTION = 0.99;


Ship.EPSILON = 1e-1;


Ship.prototype = Object.create(PIXI.MovieClip.prototype);


Ship.prototype.reset = function() {
    this.physicsAttrs = {
        shouldAccelerate: false,

        position: {x: 0, y: 0},
        velocity: {x: 0, y: 0},
        rotationSign: 1
    };
    this.position.x = this.xOffset;

    this.rotation = 0;
};


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


    var sign = function(x) { return x >= 0 ? 1 : -1; };

    if (Math.abs(this.rotation) >= 0.5 * Math.PI) {
        this.physicsAttrs.rotationSign = -1 * sign(this.rotation);
    }


    this.rotation += this.physicsAttrs.rotationSign * Ship.ROTATION_SPEED;

    if (this.physicsAttrs.shouldAccelerate) {
        this.gotoAndPlay(0);
        this.physicsAttrs.shouldAccelerate = false;
        this.physicsAttrs.velocity.x += Ship.ACCELERATION * Math.sin(this.rotation);
        this.physicsAttrs.velocity.y += Ship.ACCELERATION * Math.cos(this.rotation);
    }

    this.physicsAttrs.position.x += this.physicsAttrs.velocity.x;
    this.physicsAttrs.position.y += this.physicsAttrs.velocity.y;


    this.position.x = this.xOffset + this.physicsAttrs.position.x * this.scale.x;


    if (Math.abs(this.physicsAttrs.velocity.x) > Ship.EPSILON) {
        this.physicsAttrs.velocity.x = Ship.FRICTION * this.physicsAttrs.velocity.x;
    }

    if (Math.abs(this.physicsAttrs.velocity.y) > Ship.EPSILON) {
        this.physicsAttrs.velocity.y = Ship.FRICTION * this.physicsAttrs.velocity.y;
    }

    return this.physicsAttrs.position;
};