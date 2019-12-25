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
    // 線をいい感じに光らせて描画
    strokeWeight(20);
    stroke(255, 5);
    line(lines[i].x, 600, lines[i].x, 600 - lines[i].y);
    strokeWeight(12);
    stroke(255, 10);
    line(lines[i].x, 600, lines[i].x, 600 - lines[i].y);
    strokeWeight(7);
    stroke(255, 25);
    line(lines[i].x, 600, lines[i].x, 600 - lines[i].y);
    strokeWeight(2);
    stroke(255);
    line(lines[i].x, 600, lines[i].x, 600 - lines[i].y);

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
      // 他の線と距離が近すぎたら、離れる。
      if (distance <= 0) {
        if (-15 < distance && lines[i].y < this.y) {
          this.v += 0.02;
        }
        if (-bestDistance < distance) {
          this.v -= 0.01;
        }
      } else if (0 < distance) {
        if (distance < 15 && this.y < lines[i].y) {
          this.v -= 0.02;
        }
        if (distance < bestDistance) {
          this.v += 0.01;
        }
      }
    }

    // 摩擦を表現
    this.v *= 0.98;
  }

  // move 移動
  move() {
    this.x += this.v;

    // 画面より外には行けない
    if (this.x < 0) {
      this.x = 0;
      this.v = -0.1 * this.v;
    } else if (canvasX < this.x) {
      this.x = canvasX;
      this.v = -0.1 * this.v;
    }
  }
}
