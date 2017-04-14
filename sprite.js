var link;
var cloud;

function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function (renderingContext, x, y){ //rendering context is the canvas
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};

function initLink(img){
    //link = new Sprite(img, 0, 0, 45, 55);
    link = [
        new Sprite(img, 0, 0, 45, 55),
        new Sprite(img, 45, 0, 45, 55),
        new Sprite(img, 90, 0, 45, 55),
        new Sprite(img, 135, 0, 45, 55)
    ];
}

function initCloud(img){
    cloud = [
        //(img, how far into the sprite, 0, width visible, height visible)
        new Sprite(img, 0, 0, 224, 172),
        new Sprite(img, 237, 0, 194, 172),
        new Sprite(img, 503, 0, 131, 172),
        new Sprite(img, 692, 0, 99, 172),
        new Sprite(img, 824, 0, 52, 172)

    ];
}
