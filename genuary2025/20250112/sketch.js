let canvasWidth; 
let canvasHeight;

let font;

let mover;

let lines;

let frequency_factor = 1 / 100;

function preload() {
  // TOOD: why won't this load?
  // font = loadFont('inconsolata.otf')
}

function setup() {
  // textFont(font);
  // textSize(15);
  canvasWidth = 512;
  canvasHeight = 512;
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  let total_movers = 2;
  
  // let's get janky

  // the squares
  mover = new Mover(frequency_factor, total_movers);

  // the inner polygon
  lines = new Lines(frequency_factor, total_movers, 224);
}

function draw() {
  let num_vertices = 200 * lerp(0, 1, sin(frameCount / 100)) + 200;
  lines.num_vertices = num_vertices;
  lines.calculate_frame_offsets();
  mover.num_movers = num_vertices;
  mover.calculate_frame_offsets();

  background(64);
  // ortho();

  // x_rot = PI / 4 * (cos(frameCount * frequency_factor) + 1);
  // rotateY(x_rot);
  mover.draw();
  lines.draw();
  // text(frameCount, -(canvasWidth / 2) + 10, -(canvasHeight / 2) + 10);
}

class Mover {
  constructor(frequency_factor, num_movers) {
    this.radius = 25;
    this.color = 224;
    this.size = 170;
    this.frequency_factor = frequency_factor;
    this.num_movers = num_movers;
    this.frame_offsets = [];
    this.calculate_frame_offsets();
    this.coords = [];
    this.x_rotation_angles = [];
  }

  calculate_frame_offsets() {
    this.frame_offsets = [];
    var offset = 0
    for (let num = 0; num < this.num_movers; num++) {
      this.frame_offsets.push(offset);
      offset += ((2 * PI) / this.num_movers) / this.frequency_factor;
    }
  }

  calculate_vertices() {
    this.coords = [];
    this.x_rotation_angles = [];
    var x_pos;
    var y_pos;
    let angle;
    for (let frame_offset of this.frame_offsets) {
      angle = (frameCount + frame_offset) * frequency_factor;
      x_pos = this.radius * sin(angle);
      y_pos = this.radius * cos(angle);
      this.coords.push([x_pos, y_pos]);
      this.x_rotation_angles.push(angle % ((2 * PI) / this.frequency_factor));
    }
  }

  draw() {
    var x_pos;
    var y_pos;
    this.calculate_vertices();
    for (let ind = 0; ind < this.coords.length; ind++){
      x_pos = this.coords[ind][0];
      y_pos = this.coords[ind][1];
      push();
      translate(x_pos, y_pos, this.size / 2);
      rotateY(PI / 2);
      rotateX(this.x_rotation_angles[ind]);
      stroke(this.color);
      fill(this.color);
      strokeWeight(2);
      square(0, 0, this.size);
      pop();
    }
  }
}

class Lines {
  constructor(frequency_factor, num_vertices, radius) {
    this.color = 224;
    this.stroke_weight = 2;
    this.frequency_factor = frequency_factor;
    this.num_vertices = num_vertices;
    this.radius = radius;
    this.calculate_frame_offsets();
    this.coords = []
  }

  calculate_frame_offsets() {
    this.frame_offsets = [];
    var offset = 0
    for (let num = 0; num < this.num_vertices; num++) {
      this.frame_offsets.push(offset);
      offset += ((2 * PI) / this.num_vertices) / this.frequency_factor;
    }
  }

  calculate_vertices() {
    this.coords = []
    var x_pos;
    var y_pos;
    let angle;
    for (let frame_offset of this.frame_offsets) {
      angle = (frameCount + frame_offset) * frequency_factor;
      x_pos = this.radius * sin(angle);
      y_pos = this.radius * cos(angle);
      this.coords.push([x_pos, y_pos]);
    }
  }

  draw() {
    this.calculate_vertices();
    var vertex_1;
    var vertex_2;
    push();
    for (let ind = 0; ind < this.coords.length - 1; ind++) {
      vertex_1 = this.coords[ind];
      vertex_2 = this.coords[ind + 1];
      stroke(this.color);
      strokeWeight(2);
      // line(x1, y1, x2, y2);
      line(vertex_1[0], vertex_1[1], vertex_2[0], vertex_2[1]);
    }
    // close the polygon
    vertex_1 = this.coords.at(-1);
    vertex_2 = this.coords[0];
    line(vertex_1[0], vertex_1[1], vertex_2[0], vertex_2[1]);
    pop();
  }
}

function keyPressed() {
  if (key === 's') {
    let options = {"units": "frames"}
    saveGif('20250112_genuary', 2 * PI * 100, options);
  }
}