canvasWidth = 400;
canvasHeight = 400;

let movers = [];
let spacing = [5, 20, 40, 100];
let x_limits = [[220, 359], [160, 320], [50, 375], [0, canvasWidth]];
let y_limits = [[220, 360], [100, 380], [200, 290], [240, 260]];
let rates = [0.25, -0.375, 0.5, -0.125];
let num_movers = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
  var mover_ind = 0;
  // let's get janky
  for (let group_ind = 0; group_ind < spacing.length; group_ind++) {
    var offset = 0;
    var movers_in_group = canvasWidth / spacing[group_ind]
    for (ind = 0; ind < movers_in_group; ind++) {
      movers[mover_ind] = new Mover(offset, rates[group_ind], x_limits[group_ind], y_limits[group_ind]);
      offset += spacing[group_ind];
      mover_ind++;
    }
  }
  num_movers = mover_ind;
}

function draw() {
  background(64);
  for (ind = 0; ind < num_movers; ind++) {
    movers[ind].draw();
  }
  
}

class Mover {
  constructor(frame_off, rate, x_lim, y_lim) {
    this.rate = rate;
    this.x_pos = 0 + frame_off;
    this.y_start = y_lim[0];
    this.y_stop = y_lim[1];
    this.x_start = x_lim[0];
    this.x_stop = x_lim[1];
  }

  draw() {
    if (this.rate > 0) {
      this.x_pos = (this.x_pos + this.rate) % canvasWidth;
    } else if (this.rate < 0) {
      this.x_pos = (this.x_pos + this.rate);
      if (this.x_pos < 0) {
        this.x_pos += canvasWidth;
      }
    }

    if (this.x_pos >= this.x_start && this.x_pos <= this.x_stop) {
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
    let options = {"units": "frames"}
    saveGif('20250102_genuary', 800, options);
  }
}