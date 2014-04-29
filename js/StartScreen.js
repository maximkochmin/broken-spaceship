function StartScreen(width, height, title, info) {
    PIXI.DisplayObjectContainer.call(this);

    this.title = new PIXI.Text(
        this.setLineBreaks(title, StartScreen.TITLE_FONT_SIZE, width),
        {font: StartScreen.TITLE_FONT_SIZE + 'px monospace', fill: 'red'}
    );
    this.title.anchor.x = 0.5;
    this.title.anchor.y = 0;
    this.title.position.x = width / 2;
    this.title.position.y = height * 0.1;
    this.addChild(this.title);

    this.info = new PIXI.Text(
        this.setLineBreaks(info, StartScreen.INFO_FONT_SIZE, width),
        {font: StartScreen.INFO_FONT_SIZE + 'px monospace', fill: 'red'}
    );
    this.info.anchor.x = 0.5;
    this.info.anchor.y = 0;
    this.info.position.x = width / 2;
    this.info.position.y = height * 0.3;
    this.addChild(this.info);
}


StartScreen.TITLE_FONT_SIZE = 50;


StartScreen.INFO_FONT_SIZE = 15;


StartScreen.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);


StartScreen.prototype.setLineBreaks = function(string, fontSize, width) {
    var result = [];
    var currentLine='';
    string = string.split(' ');
    for (var i = 0; i < string.length; i++) {
        currentLine += string[i];
        if (currentLine.length > width / fontSize || i === string.length - 1) {
            result.push(currentLine);
            currentLine = '';
        } else {
            currentLine += ' ';
        }
    }
    return result.join("\n");
};