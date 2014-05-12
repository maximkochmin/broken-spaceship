var Main = function() {

    document.body.style.background = Main.COLORS.body;
    this.gameContainer = document.getElementById('gameContainer');
    this.stage = new PIXI.Stage(parseInt('0x' + Main.COLORS.background.substr(1), 16));

    var w = window.innerWidth;
    var h = window.innerHeight;
    if (w * Main.SCREEN_RATIO > h) {
        w = h / Main.SCREEN_RATIO;
    } else {
        h = w * Main.SCREEN_RATIO;
    }

    this.width = w;
    this.height = h;

    this.renderer = PIXI.autoDetectRenderer(
        this.width,
        this.height,
        this.gameContainer
    );

    this.lastRank = Main.SCORES_HISTORY_LENGTH + 1;
    this.lastScore = null;

    this.highScores = window.localStorage.getItem(Main.HIGH_SCORES_STORAGE_KEY);
    this.highScores = this.highScores === null ? [] : this.highScores.split(',');

    this.currentScreen = undefined;
    this.screens = {};

    this.showLoadingScreen();
    this.update();
    this.loadAssets();
    this.stage.setInteractive(true);
};


Main.TITLE = 'BROKEN SPACESHIP';


Main.COLORS = {
    'text': '#F8F8F2',
    'altText': '#A6E22E',
    'background': '#272822',
    'body': '#000000'
};


Main.SCREEN_RATIO = 1.78;


Main.SCORES_HISTORY_LENGTH = 10;


Main.HIGH_SCORES_STORAGE_KEY = 'high_scores';


Main.prototype.saveScore = function(score) {
    this.lastScore = score;
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
        this.screens.loading = new LoadingScreen(this.width, this.height);
    }
    this.showScreen('loading');
};


Main.prototype.showStartScreen = function() {
    if (!('start' in this.screens)) {
        this.screens.start = new StartScreen(this.width, this.height, Main.TITLE);
    }
    this.screens.start.setHighScores(this.highScores, this.lastScore, this.lastRank);
    this.showScreen('start');

    this.stage.touchstart = this.startGame.bind(this);
    this.stage.mousedown = this.startGame.bind(this);
};


Main.prototype.startGame = function() {
    if (!('game' in this.screens)) {
        this.screens.game = new GameScreen(this.width, this.height);
    }
    this.showScreen('game');
    this.screens.game.reset();

    this.stage.touchstart = this.screens.game.accelerate.bind(this.screens.game);
    this.stage.mousedown = this.screens.game.accelerate.bind(this.screens.game);
};


Main.prototype.showScreen = function(name) {
    this.stage.touchstart = undefined;
    this.stage.mousedown = undefined;
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
        "resources/monokai_background.png",
        "resources/monokai_ship.json",
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
        var self = this;
        setTimeout(function() {
            self.showStartScreen();
            self.update();
        }, 200);
        return;
    }
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
};

