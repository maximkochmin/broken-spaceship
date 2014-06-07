var StartScreen = function (width, height, title) {

    PIXI.DisplayObjectContainer.call(this);

    this.width = width;
    this.titleFontSize = width * 0.100 | 0;
    this.textFontSize = width * 0.09 | 0;

    var font = "Source Code Pro";

    this.title = new PIXI.Text(title, {
        font: this.titleFontSize + 'px ' + font,
        fill: Main.COLORS.text
    });

    this.title.anchor.x = 0.5;
    this.title.anchor.y = 0;
    this.title.position.x = width / 2;
    this.title.position.y = height * 0.1;
    this.addChild(this.title);

    this.last = new PIXI.Text('', {
        font: this.textFontSize + 'px ' + font,
        fill: Main.COLORS.altText
    });
    this.last.anchor.x = 0.5;
    this.last.anchor.y = 0;
    this.last.position.x = width / 2;
    this.last.position.y = height * 0.2;
    this.addChild(this.last);

    this.highScores = new PIXI.Text('', {
        font: this.textFontSize + 'px ' + font,
        fill: Main.COLORS.text
    });

    this.highScores.anchor.x = 0.5;
    this.highScores.anchor.y = 0;
    this.highScores.position.x = width * 0.5;
    this.highScores.position.y = height * 0.3;
    this.addChild(this.highScores);

};



StartScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);


StartScreen.prototype.setHighScores = function(arr, lastScore, currId) {
    var w = 15;

    var txt = '';
    for (var i = 0; i < arr.length; i++) {
        txt += (currId === i ? '>' : ' ') + ' ' + (i + 1) + ')';
        for (var j = 0; j < w - 2 - (i + 1).toString().length - arr[i].toString().length; j++) {
            txt += '.';
        }
        txt += arr[i] + '  \n';
    }

    if (lastScore !== null) {
        this.last.setText('last score: ' + lastScore);
    } else {
        this.last.setText('let\'s begin!');
    }

    this.highScores.setText(txt);
};
