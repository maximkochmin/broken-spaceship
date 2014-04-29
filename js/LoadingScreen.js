function LoadingScreen(width, height) {
    PIXI.DisplayObjectContainer.call(this);

    this.title = new PIXI.Text('Loading...', {font:  '30px monospace', fill: 'red'});
    this.title.anchor.x = 0.5;
    this.title.anchor.y = 0;
    this.title.position.x = width / 2;
    this.title.position.y = height / 2;
    this.addChild(this.title);

}

LoadingScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
