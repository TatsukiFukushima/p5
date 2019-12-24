const canvasX = 900;
const canvasY = 600;
const numBalls = 2;
const distance = 30;
const mouseDistance = 70;
var balls = new Array(numBalls);
const maxV = 2.5;
var averageLocationX = 0;
var averageLocationY = 0;
var averageVX = 0;
var averageVY = 0;

var calcAverageLocation = function() {
  var averageLocation = createVector(0, 0);
  for (var i = 0; i < balls.length; i++) {
    averageLocation.add(balls[i].location);
  }
  averageLocationX = averageLocation.div(balls.length).x;
  averageLocationY = averageLocation.y;
}

var calcAverageV = function() {
  var averageV = createVector(0, 0);
  for (var i = 0; i < balls.length; i++) {
    averageV.add(balls[i].v);
  }
  averageVX = averageV.div(balls.length).normalize().x;
  averageVY = averageV.y;
}

function setup() {
  createCanvas(canvasX, canvasY);
  background(5);
  for (var i = 0; i < numBalls; i++) {
    balls[i] = new Ball(i);
  }
  noStroke();
}

function draw() {
  fill(0, 100);
  rect(0, 0, canvasX, canvasY);
  calcAverageLocation();
  calcAverageV();
  for (var i = 0; i < balls.length; i++) {
    fill(140, 255, 140);
    ellipse(balls[i].location.x, balls[i].location.y, 7, 7);
    fill(140, 255, 140, 20);
    ellipse(balls[i].location.x, balls[i].location.y, 12, 12);
    fill(140, 255, 140, 5);
    ellipse(balls[i].location.x, balls[i].location.y, 20, 20);
    fill(140, 255, 140, 2);
    ellipse(balls[i].location.x, balls[i].location.y, 30, 30);
    balls[i].move();
  }
}

function mouseClicked() {
  if (balls.length <= 50) {
    append(balls, new Ball(balls.length));
    balls[balls.length - 1].location.set(mouseX, mouseY);
    balls[balls.length - 1].v.set(0, 0);
  }
}

// 球オブジェクト
class Ball {
  constructor(name) {
    this.name = name;
    this.location = createVector(random() * canvasX * 0.5, random() * canvasY * 0.5);
    this.v = createVector(random()*5, random()*3);
  }

  // 結合
  combine() {
    var averageLocation = createVector(averageLocationX, averageLocationY);
    var dir = p5.Vector.sub(this.location, averageLocation);
    this.v.sub(dir.div(4000));
  }

  // 分離
  separation() {
    for (var i = 0; i < balls.length; i++) {
      if (balls[i].name != this.name) {
        var d = p5.Vector.sub(balls[i].location, this.location);
        if (p5.Vector.mag(d) < distance) {
          this.v.sub(d.div(800));
        }
      }
    }
  }

  // 整列
  alignment() {
    var averageV = createVector(averageVX, averageVY);
    var diffV = p5.Vector.sub(averageV, this.v);
    this.v.add(diffV.normalize().div(1000));
  }

  // 反発
  repultion() {
    var mouseLocation = createVector(mouseX, mouseY);
    var d = p5.Vector.sub(mouseLocation, this.location);
    if (p5.Vector.mag(d) < mouseDistance) {
      this.v.sub(d.div(p5.Vector.mag(d) * 4));
    }
  }

  // 移動
  move() {
    var speed = p5.Vector.mag(this.v);
    this.combine();
    this.separation();
    this.alignment();
    this.repultion();
    if (speed >= maxV) {
      this.v.mult(maxV / speed)
    }
    if (
      (this.location.x < 0 && this.v.x < 0) ||
      (this.location.x > canvasX && this.v.x > 0)
    ) {
      this.v.x = this.v.x * -1;
    }
    if (
      (this.location.y < 0 && this.v.y < 0) ||
      (this.location.y > canvasY && this.v.y > 0)
    ) {
      this.v.y = this.v.y * -1;
    }
    this.location.add(this.v);
  }
}
