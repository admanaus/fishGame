var currentState,
    width,
    height,
    canvas,
    renderingContext,
    frames = 0,
    theHero,
    theCloud,
    cloudLength = 223,
    points = 0,
    cloudSelection = 0;



var cloudHeight = Math.floor(Math.random() * 80 + 30);

var states = {
    splash: 0,
    game: 1,
    score: 2
};

function Cloud(){
    this.x = 0;
    this.y = 0;
    // this.cloudHeight = 0;

    this.frame = 0;
    this.velocity = 0;
    this.annimation = [cloudSelection];

    this.update = function (){
        var h = currentState === states.splash ? 10 : 5;
        this.frame += frames % h === 0 ? 1 : 0;
        this.frame %= this.annimation.length;
    };
    this.draw = function (renderingContext){ //rendering context is the canvas
        renderingContext.save();
        renderingContext.translate(this.x, this.y);

        var h = this.annimation[this.frame];

        cloud[h].draw(renderingContext, width, height - cloudHeight);

        renderingContext.restore();
    }
}

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

        link[h].draw(renderingContext, width * 0.15, height - 55);

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
    theCloud = new Cloud;
    // theCloud.height = 30;
    // theSecondCloud = new Cloud;
    // theSecondCloud.height = 70;
}

function loadGraphics() {
    var imgLink = new Image();
    imgLink.src = "img/linkSheet.png";
    var imgCloud = new Image();
    imgCloud.src = "img/fixedCloudSprite.png";

    imgLink.onload = function (){
        initLink(this);
        initCloud(imgCloud);
        renderingContext.fillStyle = "#8BE4DF";
        //link.draw(renderingContext, 50, 50);
        gameLoop();
    };

}

function gameLoop(){
    var falling = false;
    theCloud.x--;
    // theSecondCloud.x--;

    if(Math.abs(theCloud.x) > width + 224 ){
        cloudHeight = Math.floor(Math.random() * 350 + 15);
        var randomCloud = Math.floor(Math.random() * 5);
        console.log(randomCloud);
        theCloud.annimation = [randomCloud];
        var cloudLengths = [220, 190, 127, 95, 48];
        cloudLength = cloudLengths[randomCloud];
        theCloud.x = 0;

    }
    // if(Math.abs(theSecondCloud.x) > width + 224 ){ theSecondCloud.x = 0; }

    var cloudFront = width * 0.86 - 45; //45 represents the width of the link sprite
    console.log(cloudLength);
    var cloudBack = width * 0.85 + cloudLength; //224 represents the length of the cloud sprite
    if (Math.abs(theCloud.x) > cloudFront && Math.abs(theCloud.x) < cloudBack ){
        if (theHero.y < (cloudHeight * -1) + 10){
            theHero.y += 2;
            falling = true;
        }

    } else if (theHero.y < 0){
        theHero.y += 2;
        falling = true;
    }

    if (falling === false && theHero.y < 0){
        points = points + 1;
        $("#points").replaceWith("<h3 id='points'> Points: " + points + "</h3>");
        theHero.annimation = [3];

    }
    update();
    render();
    window.requestAnimationFrame(gameLoop);

}
function update(){
    frames++;
    theHero.update();
    theCloud.update();
    // theSecondCloud.update();
}
function render(){
    renderingContext.fillRect(0, 0, width, height);
    theHero.draw(renderingContext);
    theCloud.draw(renderingContext);
    // theSecondCloud.draw(renderingContext);
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



