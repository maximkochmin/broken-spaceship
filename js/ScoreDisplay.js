var ScoreDisplay = function(x, y, screenWidth) {

    var fontSize = screenWidth * 0.08 | 0;
    PIXI.Text.call(this, '', {
        'font': fontSize + 'px Source Code Pro',
        'fill': Main.COLORS.text
    });

    this.score = 0;
    this.position.x = x;
    this.position.y = y;
    this.anchor.x = 1;
    this.anchor.y = 0;

};


ScoreDisplay.prototype = Object.create(PIXI.Text.prototype);


ScoreDisplay.prototype.setScore = function(score) {
    this.score = score;
    this.setText(this.score);
};

ScoreDisplay.prototype.getScore = function() {
    return this.score;
};