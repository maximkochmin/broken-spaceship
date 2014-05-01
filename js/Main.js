var Main = function() {
    this.gameContainer = document.getElementById('gameContainer');
    this.stage = new PIXI.Stage(0x000000);
    this.renderer = PIXI.autoDetectRenderer(
        Main.WIDTH,
        Main.HEIGHT,
        this.gameContainer
    );

    this.lastRank = Main.SCORES_HISTORY_LENGTH + 1;

    this.highScores = window.localStorage.getItem(Main.HIGH_SCORES_STORAGE_KEY);
    this.highScores = this.highScores === null ? [] : this.highScores.split(',');

    this.currentScreen = undefined;
    this.screens = {};

    this.showLoadingScreen();
    this.update();
    this.loadAssets();
};


Main.WIDTH = 640;


Main.HEIGHT = 960;


Main.SCORES_HISTORY_LENGTH = 10;


Main.HIGH_SCORES_STORAGE_KEY = 'high_scores';


Main.prototype.saveScore = function(score) {
    var i = 0;
    for (; i < this.highScores.length; i++) {
        if (this.highScores[i] < score) {
            break;
        }
    }
    this.lastRank = i;
    this.highScores.splice(i, 0, score);
    this.highScores.splice(Main.SCORES_HISTORY_LENGTH);
    window.localStorage.setItem(Main.HIGH_SCORES_STORAGE_KEY, this.highScores);
};


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
        this.screens.start = new StartScreen(Main.WIDTH, Main.HEIGHT, 'Broken spaceship');
    }
    this.screens.start.setHighScores(this.highScores, this.lastRank);
    this.showScreen('start');
    document.body.onmousedown = this.startGame.bind(this);
};


Main.prototype.startGame = function() {
    if (!('game' in this.screens)) {
        this.screens.game = new GameScreen(Main.WIDTH, Main.HEIGHT);
    }
    this.showScreen('game');
    this.screens.game.reset();
    document.body.onmousedown = this.screens.game.accelerate.bind(this.screens.game);
};


Main.prototype.showScreen = function(name) {
    document.body.onmousedown = null;
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
    this.loadFonts();
};


Main.prototype.loadFonts = function() {

    WebFontConfig = {
        google: {
            families: ['Source Code Pro:900']
        },
        active: this.onFontsLoaded.bind(this)
    };

    (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
            '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();

};


Main.prototype.onFontsLoaded = function() {
    this.showStartScreen();
};


Main.prototype.update = function() {
    if ('update' in this.getCurrentScreen()) {
        this.getCurrentScreen().update();
    }
    if (this.getCurrentScreen().gameIsFinished) {
        this.saveScore(this.getCurrentScreen().scoreDisplay.getScore());
        this.showStartScreen();
    }
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
};

