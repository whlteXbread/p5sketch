canvasWidth = 400;
canvasHeight = 400;

let movers = [];
let total_movers = 0;
let num_movers = 100;
let z_wrap = 700;

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  
  var mover_ind = 0;
  var frame_off = 0;
  // let's get janky
  for (ind = 0; ind < num_movers; ind++) {
    movers[mover_ind] = new Mover(
      frame_off,
      z_wrap,
      random(-200, 200),
      random(PI / 8, PI / 2),
      random(30, 80),
    );
    frame_off += random(10, 50);
    mover_ind++;
  }

  total_movers = mover_ind;

}

function draw() {
  background(64);
  for (ind = 0; ind < total_movers; ind++) {
    movers[ind].draw();
  }
  
}

class Mover {
  constructor(frame_off, z_wrap, x_origin, angle, length) {
    this.speed = 2;
    this.frame_offset = frame_off;
    this.z_wrap = z_wrap;
    this.xy_coords = this.calculate_coords(angle, length);
    this.x_pos = x_origin;
    this.y_pos = 100;
    this.z_pos = -100;
  }

  calculate_coords(angle, length) {
    // assumes first coord is at 0, 0
    let p2 = [length * sin(angle), -length * cos(angle)];
    let p3 = [2 * p2[0], 0];
    return [0, 0, p2[0], p2[1], p3[0], p3[1]];
  }

  draw() {
    var frame_count = frameCount + this.frame_offset;

    this.z_pos = (frame_count * this.speed) % this.z_wrap;

    let line_value = ((this.z_pos / (z_wrap - (-100))) * 136) + 64; 

    push();
    translate(this.x_pos, this.y_pos, this.z_pos);
    stroke(line_value);
    fill(64);
    strokeWeight(2);
    // triangle(x1, y1, x2, y2, x3, y3)
    triangle(
      this.xy_coords[0],
      this.xy_coords[1],
      this.xy_coords[2],
      this.xy_coords[3],
      this.xy_coords[4],
      this.xy_coords[5],
    );
    pop();
  }
}

function keyPressed() {
  if (key === 's') {
    let options = {"units": "frames"}
    saveGif('20250106_genuary', 800, options);
  }
}