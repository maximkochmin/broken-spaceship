var Main = function() {
    this.gameContainer = document.getElementById('gameContainer');
    this.stage = new PIXI.Stage(0x000000);
    this.renderer = PIXI.autoDetectRenderer(
        Main.WIDTH,
        Main.HEIGHT,
        this.gameContainer
    );
    this.loadAssets();
};


Main.WIDTH = 1280;


Main.HEIGHT = 960;


Main.prototype.loadAssets = function() {
    var assetsToLoad = [
        "resources/space_background.png",
        "resources/space_ship_sprite.json"
    ];
    var loader = new PIXI.AssetLoader(assetsToLoad);
    loader.onComplete = this.onAssetsLoaded.bind(this);
    loader.load();
};


Main.prototype.onAssetsLoaded = function() {
    this.background = new Background(Main.WIDTH, Main.HEIGHT);
    this.stage.addChild(this.background);

    this.scoreDisplay = new ScoreDisplay(Main.WIDTH - 10, 10);
    this.stage.addChild(this.scoreDisplay);

    this.ship = new Ship(Main.WIDTH / 2, Main.HEIGHT / 2);
    this.stage.addChild(this.ship);

    document.body.onclick = this.accelerate.bind(this);

    this.update();
};


Main.prototype.reset = function() {
    this.scoreDisplay.setScore(0);
    this.ship.reset();
    this.background.reset();
};


Main.prototype.update = function() {
    var p = this.ship.update();
    this.scoreDisplay.setScore(parseInt(p.y / 100, 10));
    this.background.setViewportPosition(p.x, p.y);
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
};


Main.prototype.accelerate = function() {
    this.ship.accelerate();
};