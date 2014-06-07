
var ObjectPool = function(scale) {
    this.objects = {};
    this.scale = scale;

    this.createObstacleSprites();
};



ObjectPool.NUMBER_OF_EACH_SPRITE = 5;


ObjectPool.OBSTACLES = {
    hint: {
        width: 610,
        height: 610,
        texture: 'resources/monokai_hint.png',
        handler: TransparentObstacle
    },
    redStar150: {
        width: 150,
        height: 150,
        texture: 'resources/monokai_red_star_150.png',
        handler: StarObstacle
    },
    yellowStar321x107: {
        width: 321,
        height: 107,
        texture: 'resources/monokai_yellow_star_321_107.png',
        handler: StarObstacle
    },
    redStar99x65: {
        width: 99,
        height: 65,
        texture: 'resources/monokai_red_star_99_65.png',
        handler: StarObstacle
    },
    redGates150: {
        width: 610,
        height: 150,
        texture: 'resources/monokai_red_gates_150.png',
        handler: GatesObstacle,
        leftBlockWidth: 85,
        rightBlockWidth: 290,
        spriteOptions: {
            anchor: new PIXI.Point(0, 0)
        }
    },
    blueGates30_1: {
        width: 610,
        height: 30,
        texture: 'resources/monokai_blue_gates_30_1.png',
        handler: GatesObstacle,
        leftBlockWidth: 240,
        rightBlockWidth: 465,
        spriteOptions: {
            anchor: new PIXI.Point(0, 0)
        }
    },
    obstacle75: {
        width: 75,
        height: 75,
        texture: 'resources/monokai_obstacle_75.png',
        handler: Obstacle
    },
    obstacle99x51: {
        width: 99,
        height: 51,
        texture: 'resources/monokai_obstacle_99_51.png',
        handler: Obstacle
    }
};


ObjectPool.prototype.createObstacleSprites = function() {
    var j, o;
    for (var i in ObjectPool.OBSTACLES) {

        o = ObjectPool.OBSTACLES[i];
        if (typeof o.spriteOptions !== "object") {
            o.spriteOptions = {};
        }
        o.spriteOptions.scale = new PIXI.Point(this.scale, this.scale);

        this.objects[i] = [];
        for (j = 0; j < ObjectPool.NUMBER_OF_EACH_SPRITE; j++) {
            this.objects[i].push(new ObstacleSprite(o.width, o.height, o.texture, o.spriteOptions));
        }

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