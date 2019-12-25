const canvasX = 900;
const canvasY = 600;
const numLines = 100;
const bestDistance = canvasX / (numLines-1);
var lines = new Array(numLines);

function setup() {
  createCanvas(canvasX, canvasY);
  background(5);
  for (var i = 0; i < numLines; i++) {
    lines[i] = new Line(i);
  }
}

function draw() {
  fill(0, 80);
  rect(0, 0, canvasX, canvasY);
  for (var i = 0; i < numLines; i++) {
    var lineX = lines[i].x
    var lineY = 600 - lines[i].y

    // 線をいい感じに光らせて描画
    strokeWeight(15);
    stroke(255, 5);
    line(lineX, 600, lineX, lineY);
    strokeWeight(10);
    stroke(255, 8);
    line(lineX, 600, lineX, lineY);
    strokeWeight(5);
    stroke(255, 25);
    line(lineX, 600, lineX, lineY);
    strokeWeight(2);
    stroke(255);
    line(lineX, 600, lineX, lineY);

    // 速度を計算して移動
    lines[i].calcV();
    lines[i].move();
  }
}

// Line
class Line {
  constructor(name) {
    this.name = name;
    this.x = random() * canvasX;
    this.y = random() * canvasY;
    this.v = 0;
  }

  // calcV 速度を計算
  calcV() {
    for (var i = 0; i < numLines; i++) {
      if (lines[i].name == this.name) {
        continue;
      }
      var distance = this.x - lines[i].x

      // 周囲を見回してみて場違いっぽい場所にいたら移動。
      if (Math.abs(distance) < 20) {
        if (lines[i].y < this.y) {
          this.v += 0.02;
        } else {
          this.v -= 0.02;
        }
      }

      // 他の線と距離が近すぎたら、離れる。
      if (Math.abs(distance) < bestDistance) {
        if (distance < 0) {
          this.v -= 0.005;
        } else if (0 < distance) {
          this.v += 0.005;
        }
      }
    }

    // 摩擦を表現
    this.v *= 0.95;
  }

  // move 移動
  move() {
    this.x += this.v;

    // 画面より外には行けない。若干跳ね返る。
    if (this.x < 0) {
      this.x = 0;
      this.v = -0.1 * this.v;
    } else if (canvasX < this.x) {
      this.x = canvasX;
      this.v = -0.1 * this.v;
    }
  }
}
