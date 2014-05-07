var StartScreen = function (width, height, textColor, title) {

    PIXI.DisplayObjectContainer.call(this);

    this.width = width;
    this.titleFontSize = width * 0.100 | 0;
    this.textFontSize = width * 0.09 | 0;

    var font = "Source Code Pro";
    var fill = textColor;

    this.title = new PIXI.Text(title, {
        font: this.titleFontSize + 'px ' + font,
        fill: fill
    });
    this.title.anchor.x = 0.5;
    this.title.anchor.y = 0;
    this.title.position.x = width / 2;
    this.title.position.y = height * 0.1;
    this.addChild(this.title);

    this.highScores = new PIXI.Text('', {
        font: this.textFontSize + 'px ' + font,
        fill: fill
    });
    this.highScores.anchor.x = 0.5;
    this.highScores.anchor.y = 0;
    this.highScores.position.x = width * 0.5;
    this.highScores.position.y = height * 0.3;
    this.addChild(this.highScores);

};


StartScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);


StartScreen.prototype.setHighScores = function(arr, currId) {
    var w = 15;
    var txt = '';
    for (var i = 0; i < arr.length; i++) {
        txt += (currId === i ? '>' : ' ') + ' ' + (i + 1) + ')';
        for (var j = 0; j < w - 2 - (i + 1).toString().length - arr[i].toString().length; j++) {
            txt += '.';
        }
        txt += arr[i] + '  \n';
    }
    this.highScores.setText(txt);
};
