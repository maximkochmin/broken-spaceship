var Main = function() {
    this.gameContainer = document.getElementById('gameContainer');
    this.stage = new PIXI.Stage(0x000000);
    this.renderer = PIXI.autoDetectRenderer(
        Main.WIDTH,
        Main.HEIGHT,
        this.gameContainer
    );

    this.currentScreen = undefined;
    this.screens = {};

    this.showLoadingScreen();
    this.update();
    this.loadAssets();
};


Main.WIDTH = 640;


Main.HEIGHT = 960;


Main.prototype.getCurrentScreen = function() {
    return this.currentScreen ? this.screens[this.currentScreen] : null;
};


Main.prototype.showLoadingScreen = function() {
    if (!('loading' in this.screens)) {
        this.screens.loading = new LoadingScreen(Main.WIDTH, Main.HEIGHT);
    }
    this.showScreen('loading');
};


Main.prototype.showStartScreen = function() {
    if (!('start' in this.screens)) {
        this.screens.start = new StartScreen(Main.WIDTH, Main.HEIGHT, 'Broken spaceship', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, porro, sapiente, reprehenderit, nostrum expedita nemo recusandae fuga consectetur vero deserunt delectus autem mollitia. Perspiciatis, nostrum reiciendis quaerat unde odit aliquid.');
    }
    this.showScreen('start');
    document.body.onclick = this.startGame.bind(this);
};


Main.prototype.startGame = function() {
    if (!('game' in this.screens)) {
        this.screens.game = new GameScreen(Main.WIDTH, Main.HEIGHT);
    }
    this.showScreen('game');
    this.screens.game.reset();
    document.body.onclick = this.screens.game.accelerate.bind(this.screens.game);
};


Main.prototype.showScreen = function(name) {
    document.body.onclick = null;
    if (!(name in this.screens)) {
        throw new RangeError('Screen "' + name + '" does not exist');
    }
    if (this.currentScreen === name) {
        return;
    } else if (this.currentScreen) {
        this.stage.removeChild(this.screens[this.currentScreen]);
    }
    this.stage.addChild(this.screens[name]);
    this.currentScreen = name;
};


Main.prototype.loadAssets = function() {
    var assetsToLoad = [
        "resources/space_background.png",
        "resources/space_ship_sprite.json",
        "resources/obstacle_prototype.png"
    ];
    var loader = new PIXI.AssetLoader(assetsToLoad);
    loader.onComplete = this.onAssetsLoaded.bind(this);
    loader.load();
};


Main.prototype.onAssetsLoaded = function() {
    this.showStartScreen();
};


Main.prototype.update = function() {
    if ('update' in this.getCurrentScreen()) {
        this.getCurrentScreen().update();
    }
    if (this.getCurrentScreen().gameIsFinished) {
        this.showStartScreen();
    }
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
};

