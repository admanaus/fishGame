var currentState,
    width,
    height,
    canvas,
    renderingContext;

var states = {
    spalsh: 0,
    game: 1,
    score: 2

};

function main(){
    windowSetup();
    canvasSetup();
    currentState = states.splash;
    document.body.appendChild(canvas);
    loadGraphics();
}

function loadGraphics() {
    var img = new Image();
    img.src = "img/linkSprite.png";
    img.onload = function (){
        initSprites(this);
        renderingContext.fillStyle = "#8BE4DF";
        renderingContext.fillRect(0, 0, width, height);


        link.draw(renderingContext, 50, 50);
    };

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
}

function canvasSetup(){
    canvas = document.createElement("canvas");
    canvas.style.border = "1px solid black";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext("2d");
}


