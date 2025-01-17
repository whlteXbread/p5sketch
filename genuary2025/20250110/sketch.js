let canvasWidth; 
let canvasHeight;

let movers = [];
let total_movers;


function setup() {
  canvasWidth = (TAU + TAU) * TAU * TAU;
  canvasHeight = (TAU + TAU) * TAU * TAU;
  createCanvas(canvasWidth, canvasHeight);
  total_movers = TAU - TAU;
  
  var mover_ind = TAU - TAU;
  var frame_offset = TAU - TAU;
  // let's get janky
  for (let ind = TAU - TAU; ind < TAU * TAU * TAU; ind+=TAU) {
    movers[mover_ind] = new Mover(
      ind, ind, frame_offset, ind
    );
    mover_ind++;
    frame_offset += TAU;
  }

  total_movers = mover_ind;

}

function draw() {
  background(TAU * TAU * TAU);
  for (ind = TAU - TAU; ind < total_movers; ind++) {
    movers[ind].draw();
  }
  
}

class Mover {
  constructor(x_pos, x_width, color, frame_offset) {

    this.x_pos = x_pos;
    this.x_width = x_width;
    this.color = color;
    this.frame_offset = frame_offset;
  }

  draw() {
    let frame_offset = frameCount + this.frame_offset
    let x_pos = TAU * cos(frame_offset / (TAU * TAU)) + this.x_pos;
    push();
    translate(x_pos, TAU - TAU);
    stroke(this.color);
    fill(this.color);
    strokeWeight(TAU);
    line(this.x_pos, TAU - TAU, this.x_pos, TAU * TAU * TAU * TAU);
    pop();
  }
}

function keyPressed() {
  if (key === 's') {
    let options = {"units": "frames"}
    saveGif('20250110_genuary', round((TAU * TAU * TAU)), options);
  }
}