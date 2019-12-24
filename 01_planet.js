var movers = new Array(25);
var colors = new Array([1,0,0], [1,1,0], [1,0,1], [0,1,0], [0,1,1], [0,0,1]);

function setup() {
    createCanvas(900, 600);
    background(7);
    for (var i = 0; i < movers.length; i++) {
        movers[i] = new Mover();
    }
}

function draw() {
    fill(0, 15);
    rect(0, 0, width, height);
    for (var i = 0; i < movers.length; i++) {
        movers[i].update();
        movers[i].display();
        movers[i].checkEdges();
    }
}

class Mover {
    constructor() {
        this.a;
        this.location = createVector(random(width), random(height));
        this.v = createVector(0, 0);
        var color = random(colors);
        this.colorR = 105 + 150 * color[0];
        this.colorG = 105 + 150 * color[1];
        this.colorB = 105 + 150 * color[2];
        // this.colorR = random(150, 255);
        // this.colorG = random(150, 255);
        // this.colorB = random(150, 255);
        this.topV = 5;
    }

    update() {
        var mouse = createVector(mouseX, mouseY);
        var dir = p5.Vector.sub(mouse, this.location);
        var magn = p5.Vector.mag(dir); //マウスまでの距離
        // dir.normalize();
        dir.mult(18 / (magn * magn + 800));
        this.a = dir;
        this.v.add(this.a);
        this.v.limit(this.topV);
        this.location.add(this.v);
    }

    display() {
        noStroke();
        fill(this.colorR, this.colorG, this.colorB, 1);
        ellipse(this.location.x, this.location.y, 30, 30);
        fill(this.colorR, this.colorG, this.colorB, 10);
        ellipse(this.location.x, this.location.y, 18, 18);
        fill(this.colorR, this.colorG, this.colorB, 30);
        ellipse(this.location.x, this.location.y, 10, 10);
        fill(255);
        ellipse(this.location.x, this.location.y, 6, 6);
    }

    checkEdges() {
        if (this.location.x > width) {
            this.location.x = 0;
            this.location.y = random(height);
            this.v.set(random(4), 0);
        } else if (this.location.x < 0) {
            this.location.x = width;
            this.location.y = random(height);
            this.v.set(random(-4), 0);
        }
        if (this.location.y > height) {
            this.location.x = random(width);
            this.location.y = 0;
            this.v.set(0, random(4));
        } else if (this.location.y < 0) {
            this.location.x = random(width);
            this.location.y = height;
            this.v.set(0, random(-4));
        }
    }
}
