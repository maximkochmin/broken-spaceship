var Main = function() {
    this.gameContainer = document.getElementById('gameContainer');
    this.stage = new PIXI.Stage(0x000000);
    this.renderer = PIXI.autoDetectRenderer(
        Main.WIDTH,
        Main.HEIGHT,
        this.gameContainer
    );

    this.background = new Background(Main.WIDTH, Main.HEIGHT);
    this.stage.addChild(this.background);

    this.text = new PIXI.Text('КЛИКАЙ ЧТОБЫ УСКОРИТЬСЯ!', {
        font: '30px PT Mono',
        fill: 'rgba(255, 255, 255, 0.5)'
    });
    this.text.anchor.x = 0.5;
    this.text.position.x = Main.WIDTH / 2;
    this.text.position.y = 60;
    this.stage.addChild(this.text);

    this.ship = new Ship(Main.WIDTH / 2, Main.HEIGHT / 2);
    this.stage.addChild(this.ship);

    document.body.onclick = this.accelerate.bind(this);

    this.update();
};


Main.WIDTH = 1280;


Main.HEIGHT = 960;


Main.prototype.update = function() {
    var p = this.ship.update();
    this.background.setViewportPosition(p);
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
};


Main.prototype.accelerate = function() {
    this.ship.accelerate();
};