var ScoreDisplay = function(x, y) {

    PIXI.Text.call(this, '', ScoreDisplay.FONT_OPTIONS);

    this.score = 0;
    this.position.x = x;
    this.position.y = y;
    this.anchor.x = 1;
    this.anchor.y = 0;

    this.setText(this.score);

};


ScoreDisplay.prototype = Object.create(PIXI.Text.prototype);


ScoreDisplay.FONT_OPTIONS = {
    'font': '30px Monaco',
    'fill': 'rgba(255, 255, 255, 0.5)'
};


ScoreDisplay.prototype.setScore = function(score) {
    this.score = score;
    this.setText(this.score);
};

ScoreDisplay.prototype.getScore = function() {
    return this.score;
};