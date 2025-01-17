canvasWidth = 400;
canvasHeight = 400;

let movers = [];
let spacing = 20;
let num_movers = canvasWidth / spacing;
let left_limit = 220;
let right_limit = 359;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  var offset = 0;
  for (ind = 0; ind < num_movers; ind++) {
    movers[ind] = new Mover(offset);
    offset += spacing;
  }
}

function draw() {
  background(64);
  for (ind = 0; ind < num_movers; ind++) {
    movers[ind].draw();
  }
}

class Mover {
  constructor(frame_off) {
    this.frame_offset = frame_off;
    this.x_pos = 0 + frame_off;
    this.y_start = 220;
    this.y_stop = 360;
  }

  draw() {
    this.x_pos = (this.x_pos + 0.5) % canvasWidth;

    if (this.x_pos >= left_limit && this.x_pos <= right_limit) {
      push();
      translate(this.x_pos, 0, 0);
      stroke(200);
      strokeWeight(2);
      line(0, this.y_start, 0, this.y_stop);
      pop();
    }
  }
}

function keyPressed() {
  if (key === 's') {
    saveFrames('20250101_genuary', 'png', 1, 30);
  }
}