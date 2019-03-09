const Score = function (bird, pipes, c, ctx) {
    this.scored = false;
    this.score = 0;
    this.bird = bird;
    this.pipes = pipes;
    this.c = c;
    this.ctx = ctx;
}

Score.prototype.update = function (pipes) {
    this.pipes.forEach((pipes, i) => {
        //bird passed pipe
        if (this.bird.x > pipes.xpos + pipes.width &&
        !pipes.passed) {
            
            pipes.passed = true;
            this.score += 0.5;
        }
        
    });
}

Score.prototype.render = function(){
    this.ctx.save();
    this.ctx.font = "24px Arial";
    this.ctx.fillText("Score: " + this.score, 8, 20);
    this.ctx.restore();
};

