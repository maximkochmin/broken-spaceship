function LoadingScreen(width, height) {
    PIXI.DisplayObjectContainer.call(this);

    fontSize = width * 0.1 | 0;

    this.title = new PIXI.Text('...', {font:  fontSize + 'px monospace', fill: Main.COLORS.text});
    this.title.anchor.x = 0.5;
    this.title.anchor.y = 0;
    this.title.position.x = width / 2;
    this.title.position.y = height / 2;
    this.addChild(this.title);

}

LoadingScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
