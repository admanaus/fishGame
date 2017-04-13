var currentState,
    width,
    height,
    canvas,
    renderingContext,
    frames = 0,
    theHero;

var states = {
    splash: 0,
    game: 1,
    score: 2
};

function Hero(){
    this.x = 0;
    this.y = 0;

    this.frame = 0;
    this.velocity = 0;
    this.annimation = [0, 1, 2, 1];

    this.rotation = 0;
    this.radius = 12;

    this.gravity = 0.25;
    this._jump = 4.6;

    this.update = function (){
        var h = currentState === states.splash ? 10 : 5;
        this.frame += frames % h === 0 ? 1 : 0;
        this.frame %= this.annimation.length;
    };

    this.draw = function (renderingContext){ //rendering context is the canvas
        renderingContext.save();
        renderingContext.translate(this.x, this.y);
        renderingContext.rotate(this.rotation);

        var h = this.annimation[this.frame];

        link[h].draw(renderingContext, 0, height - 55);

        renderingContext.restore();
    }
}

function main(){
    windowSetup();
    canvasSetup();
    currentState = states.splash;
    document.body.appendChild(canvas);
    loadGraphics();
    theHero = new Hero;
}

function loadGraphics() {
    var img = new Image();
    img.src = "img/linkSheet.png";
    img.onload = function (){
        initSprites(this);
        renderingContext.fillStyle = "#8BE4DF";
        //link.draw(renderingContext, 50, 50);
        gameLoop();
    };
}

function gameLoop(){
    if (theHero.x < width){
        theHero.x++;
    } else {theHero.x = -45;}

    if (theHero.y < 0) {
        theHero.y += 2;
    }

    update();
    render();
    window.requestAnimationFrame(gameLoop);

}
function update(){
    frames++;
    theHero.update();
}
function render(){
    renderingContext.fillRect(0, 0, width, height);
    theHero.draw(renderingContext);
}

function windowSetup() {
    var windowWidth = window.innerWidth;
    if(windowWidth < 500){
        width = 320;
        height = 430;
    } else {
        width = 400;
        height = 430;
    }
    document.addEventListener("click", function () {
        theHero.y -= 80;
    })
}

function canvasSetup(){
    canvas = document.createElement("canvas");
    canvas.style.border = "1px solid black";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext("2d");
}


