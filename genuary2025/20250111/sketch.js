let canvasWidth; 
let canvasHeight;

let font;

let movers = [];
let total_movers;

let frequency_factor = 1 / 100;

function preload() {
  // TOOD: why won't this load?
  font = loadFont('inconsolata.otf')
}

function setup() {
  textFont(font);
  textSize(15);
  canvasWidth = 512;
  canvasHeight = 512;
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  total_movers = 16;
  
  var mover_ind = 0;
  var frame_offset = 0;  
  // let's get janky
  for (let ind = 0; ind < total_movers; ind++) {
    movers[mover_ind] = new Mover(
      frame_offset, frequency_factor
    );
    mover_ind++;
    frame_offset += ((2 * PI) / total_movers) / frequency_factor;
  }

  total_movers = mover_ind;

}

function draw() {
  background(64);
  // ortho();

  x_rot = PI / 4 * (cos(frameCount * frequency_factor) + 1);
  rotateY(x_rot);
  for (ind = 0; ind < total_movers; ind++) {
    movers[ind].draw();
  }
  // text(frameCount, -(canvasWidth / 2) + 10, -(canvasHeight / 2) + 10);
}

class Mover {
  constructor(frame_offset, frequency_factor) {
    this.frame_offset = frame_offset;
    this.radius = 128;
    this.color = 224;
    this.size = 100;
    this.frequency_factor = frequency_factor;
  }

  draw() {
    let angle = (frameCount + this.frame_offset) * this.frequency_factor;
    let x_pos = this.radius * sin(angle);
    let y_pos = this.radius * cos(angle);
    push();
    translate(x_pos, y_pos, this.size / 2);
    rotateY(PI / 2);
    rotateX(angle % ((2 * PI) / this.frequency_factor));
    stroke(this.color);
    fill(this.color);
    strokeWeight(2);
    square(0, 0, this.size);
    pop();
  }
}

function keyPressed() {
  if (key === 's') {
    let options = {"units": "frames"}
    saveGif('20250111_genuary', 2 * PI / frequency_factor, options);
  }
}