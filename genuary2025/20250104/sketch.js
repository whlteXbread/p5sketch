canvasWidth = 400;
canvasHeight = 400;

let movers = [];
let periods = [400, 400];
let rates = [1, -1];
let plot_step = 0;
let num_movers = 40;
let total_movers = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  plot_step = (PI) / num_movers;
  
  var mover_ind = 0;
  // let's get janky
  for (let group_ind = 0; group_ind < periods.length; group_ind++) {
    var offset = 0;
    var plot_input = 0;
    var function_value = 0;
    var wrap_width = periods[group_ind];
    for (ind = 0; ind < num_movers; ind++) {
      movers[mover_ind] = new Mover(offset, rates[group_ind], wrap_width);
      plot_input += plot_step;
      function_value = sin(plot_input);
      offset += ((abs(function_value) * ((wrap_width / num_movers / 2) * PI)));
      mover_ind++;
    }
  }
  total_movers = mover_ind;
}

function draw() {
  background(255);
  for (ind = 0; ind < total_movers; ind++) {
    movers[ind].draw();
  }
  
}

class Mover {
  constructor(frame_off, rate, wrap_width) {
    this.rate = rate;
    this.x_pos = 0 + frame_off;
    this.wrap_width = wrap_width;
  }

  draw() {
    if (this.rate > 0) {
      this.x_pos = (this.x_pos + this.rate) % this.wrap_width;
    } else if (this.rate < 0) {
      this.x_pos = (this.x_pos + this.rate);
      if (this.x_pos < 0) {
        this.x_pos += this.wrap_width;
      }
    }

    if (this.x_pos < canvasWidth) {
      push();
      translate(this.x_pos, 0, 0);
      stroke(0);
      strokeWeight(1);
      line(0, 0, 0, canvasHeight);
      pop();
    }
  }
}

function keyPressed() {
  if (key === 's') {
    let options = {"units": "frames"}
    saveGif('20250104_genuary', 400, options);
  }
}