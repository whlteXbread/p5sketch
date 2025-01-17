canvasWidth = 400;
canvasHeight = 400;

let movers = [];
let total_movers = 0;
let x_0 = 0;
let y_0 = 0;
let x_1 = canvasWidth;
let y_1 = canvasHeight;
let mover_geom = [
//x1 y1   x1 y2 x3 y3 x4 y4
  [x_0 - 5, y_0, x_0 + 50, y_0, x_0 + 50, y_1, x_0 - 5, y_1],
  [x_0 + 50, y_0, x_0 + 60, y_0, x_0 + 60, y_1, x_0 + 50, y_1],
  [x_0 + 60, y_0, x_0 + 80, y_0, x_0 + 80, y_1, x_0 + 60, y_1],
  [x_0 + 80, y_0, x_0 + 100, y_0, x_0 + 100, y_1, x_0 + 80, y_1],
  [x_0 + 100, y_0, x_0 + 115, y_0, x_0 + 115, y_1, x_0 + 100, y_1],
  [x_0 + 115, y_0, x_0 + 135, y_0, x_0 + 135, y_1, x_0 + 115, y_1],
  [x_0 + 135, y_0, x_0 + 145, y_0, x_0 + 145, y_1, x_0 + 135, y_1],
  [x_0 + 145, y_0, x_0 + 170, y_0, x_0 + 170, y_1, x_0 + 145, y_1],
  [x_0 + 170, y_0, x_0 + 177, y_0, x_0 + 177, y_1, x_0 + 170, y_1],
  [x_0 + 177, y_0, x_0 + 207, y_0, x_0 + 207, y_1, x_0 + 177, y_1],
  [x_0 + 207, y_0, x_0 + 212, y_0, x_0 + 212, y_1, x_0 + 207, y_1],
  [x_0 + 212, y_0, x_0 + 247, y_0, x_0 + 247, y_1, x_0 + 212, y_1],
  [x_0 + 247, y_0, x_0 + 252, y_0, x_0 + 252, y_1, x_0 + 247, y_1],
  // [x_0 + 252, y_0, x_1, y_0, x_1, y_1, x_0 + 252, y_1],
];
let colors = [
  [49, 43, 60],
  [138, 89, 34],
  [49, 43, 60],
  [142, 67, 25],
  [49, 43, 60],
  [129, 57, 27],
  [49, 43, 60],
  [109, 42, 23],
  [49, 43, 60],
  [90, 26, 18],
  [49, 43, 60],
  [68, 22, 16],
  [49, 43, 60],
  // [113, 100, 95],
];
z_rate = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
  var mover_ind = 0;
  var frame_offset = 0;
  // let's get janky
  for (let ind = 0; ind < mover_geom.length; ind++) {
    movers[mover_ind] = new Mover(
      mover_geom[ind], colors[ind], frame_offset
    );
    mover_ind++;
    frame_offset += 20;
  }

  total_movers = mover_ind;

}

function draw() {
  background(113, 100, 95);
  for (ind = 0; ind < total_movers; ind++) {
    movers[ind].draw();
  }
  
}

class Mover {
  constructor(quad_shape, color, frame_offset) {

    // this.xy_coords = xy_coords;
    this.quad_shape = quad_shape;
    this.color = color;
    this.frame_offset = frame_offset;
  }

  draw() {
    let frame_offset = frameCount + this.frame_offset
    let x_pos = 5 * cos(frame_offset / 50);
    push();
    translate(x_pos, 0);
    stroke(...this.color);
    fill(...this.color);
    strokeWeight(2);
    quad(...this.quad_shape);
    pop();
  }
}

function keyPressed() {
  if (key === 's') {
    let options = {"units": "frames"}
    saveGif('20250109_genuary', mover_geom.length * 24, options);
  }
}