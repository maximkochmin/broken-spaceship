var Ship = function(x, y, width) {
    var textures = [
        new PIXI.Texture.fromFrame("abstract_spaceship0.png"),
        new PIXI.Texture.fromFrame("abstract_spaceship1.png"),
        new PIXI.Texture.fromFrame("abstract_spaceship2.png"),
        new PIXI.Texture.fromFrame("abstract_spaceship3.png"),
        new PIXI.Texture.fromFrame("abstract_spaceship4.png"),
        new PIXI.Texture.fromFrame("abstract_spaceship5.png"),
        new PIXI.Texture.fromFrame("abstract_spaceship4.png"),
        new PIXI.Texture.fromFrame("abstract_spaceship3.png"),
        new PIXI.Texture.fromFrame("abstract_spaceship2.png"),
        new PIXI.Texture.fromFrame("abstract_spaceship1.png"),
        new PIXI.Texture.fromFrame("abstract_spaceship0.png")
    ];

    PIXI.MovieClip.call(this, textures);

    this.middlePositionX = x;

    var scale = width / Ship.TEXTURE_WIDTH;
    this.anchor.x = 0.5;
    this.anchor.y = 0.25;
    this.position.x = x;
    this.position.y = y;
    this.scale.x = scale;
    this.scale.y = scale;
    this.animationSpeed = 0.6;
    this.loop = false;
    this.reset();

};


Ship.TEXTURE_WIDTH = 16;


Ship.ACCELERATION = 10;


Ship.ROTATION_SPEED = Math.PI / 45;


Ship.FRICTION = 0.99;


Ship.EPSILON = 1e-1;


Ship.prototype = Object.create(PIXI.MovieClip.prototype);


Ship.prototype.reset = function() {
    this.physicsAttrs = {
        shouldAccelerate: false,
        position: {x: this.middlePositionX, y: 0},
        velocity: {x: 0, y: 0},
        rotationSign: 1
    };
    this.position.x = this.middlePositionX;
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

    this.position.x = this.physicsAttrs.position.x;

    if (Math.abs(this.physicsAttrs.velocity.x) > Ship.EPSILON) {
        this.physicsAttrs.velocity.x = Ship.FRICTION * this.physicsAttrs.velocity.x;
    }

    if (Math.abs(this.physicsAttrs.velocity.y) > Ship.EPSILON) {
        this.physicsAttrs.velocity.y = Ship.FRICTION * this.physicsAttrs.velocity.y;
    }

    return this.physicsAttrs.position;
};