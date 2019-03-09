window.onload = function () {
    const c = document.getElementById('canvas');
    newgame = document.getElementById('newgame');

    //sizing canvas
    c.width = window.innerWidth-18;
    c.height = 700;

    const ctx = c.getContext('2d');
    
    const environment = new Environment(c, ctx);
    
    const bird = new Bird(300, 300, ctx);
    const theme = new Audio();
    theme.src = "./sounds/theme.mp3";
    
    const pipes = [];
    let pipeSet = generateRandomPipes(ctx, c.width, c.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
    setInterval(function () {
        let pipeSet = generateRandomPipes(ctx, c.width, c.height);
        pipes.push(pipeSet.top, pipeSet.bottom);
    }, 2600);

    const score = new Score(bird, pipes, c, ctx);

    gameLoop();

    /*
       Main Game Loop
    */
    function gameLoop() 
    {
        bird.update(pipes);

        if (!bird.dead) {
            environment.update();
    
            pipes.forEach(function(pipe1){
                pipe1.update();
                score.update(pipes);
            });
            
            theme.play();
        }

        environment.render();
        pipes.forEach(function(pipe1){
            pipe1.render();
        });
        bird.render();
        score.render();
        if (bird.dead){
            theme.pause();
            theme.currentTime = 0;
            drawGameOver(ctx, c);
            newgame.style.display = 'inline';
            
        } 
         
        window.requestAnimationFrame(gameLoop);
    }
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight) {
    let lengthTop = Math.round(Math.random() * 200 + 50);
    let lengthBottom = canvasHeight - 250 - lengthTop;
    let returnVal = { };
    returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
    returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 4, ctx);
    return returnVal;
}

function drawGameOver(ctx, c) {
    var gameover = document.createElement("div");
    gameover.classList.add('gameover-container');
    gameover.setAttribute("style", `position: absolute; z-index: 99; top: ${(c.height/2) - 150}px; left: ${(c.width/2)-150}px; width: 300px; height: 300px; background: url(./images/flappygameover.jpg);`);
    document.body.appendChild(gameover);
    
}

function newGame(){
    window.location.reload();
}

