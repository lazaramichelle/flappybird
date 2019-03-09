
const Ground = function(c, ctx){
    this.c = c;
    this.ctx = ctx;
    this.bgPos = 0;
    this.fgPos = 0;
    this.groundSpeed = 1;
    this.groundWidth = 450;
    this.groundImg = document.getElementById('ground');
};

Ground.prototype.update = function(){
    this.bgPos -= this.groundSpeed;
    if(this.bgPos < -this.groundWidth)
    this.bgPos = 0;

};

Ground.prototype.render = function(){
    for(let i = 0; i <= this.c.width/this.groundWidth+1; i++)
    this.ctx.drawImage(this.groundImg, this.bgPos+i*this.groundWidth, 700);
};