function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
} let canvasWidth;
let canvasHeight;

let font;

let mover;

let lines;

let frequency_factor = 1 / 100;


function setup() {
  // textFont(font);
  // textSize(15);
  canvasWidth = 512;
  canvasHeight = 512;
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  let total_movers = 2;

  // let's get janky

  // rotating lines
  outer_lines = new Mover(frequency_factor, 32, 100, 70, 3, 224);
  inner_lines = new Mover(frequency_factor / 5, 15, 65, 20, 2, 224);
  middle_lines = new Mover(frequency_factor / 2, 9, 65, 60, 1, 224);

  // planets
  outer_planet = new Planet(-frequency_factor / 3, 1, 200, 8);
  middle_planet = new Planet(-frequency_factor, 1, 120, 5);
  inner_planet = new Planet(-3 * frequency_factor, 1, 47, 5);
}

function draw() {
  let num_vertices = 32; // 200 * lerp(0, 1, sin(frameCount / 100)) + 200;
  outer_lines.calculate_frame_offsets();
  inner_lines.calculate_frame_offsets();
  middle_lines.calculate_frame_offsets();

  outer_planet.calculate_frame_offsets();
  middle_planet.calculate_frame_offsets();
  inner_planet.calculate_frame_offsets();

  background(131, 112, 52);
  // ortho();

  outer_lines.draw();
  inner_lines.draw();
  middle_lines.draw();

  outer_planet.draw();
  middle_planet.draw();
  inner_planet.draw();
}

class Mover {
  constructor(frequency_factor, num_movers, radius, size, line_stroke = 2, object_color = 224) {
    this.radius = radius;
    this.object_color = object_color;
    this.line_stroke = line_stroke;
    this.size = size;
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
    var angle;
    for (let frame_offset of this.frame_offsets) {
      angle = (frameCount + frame_offset) * this.frequency_factor;
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
    for (let ind = 0; ind < this.coords.length; ind++) {
      x_pos = this.coords[ind][0];
      y_pos = this.coords[ind][1];
      push();
      translate(x_pos, y_pos, this.size / 2);
      rotateY(PI / 2);
      rotateX(this.x_rotation_angles[ind]);
      stroke(this.object_color);
      fill(this.object_color);
      strokeWeight(this.line_stroke);
      square(0, 0, this.size);
      pop();
    }
  }
}

class Planet extends Mover {
  draw() {
    var x_pos;
    var y_pos;
    this.calculate_vertices();
    x_pos = this.coords[0][0];
    y_pos = this.coords[0][1];
    push();
    translate(x_pos, y_pos, this.size / 2);
    stroke(this.color);
    fill(this.color);
    strokeWeight(2);
    circle(0, 0, this.size);
    pop();
  }
}

function keyPressed() {
  if (key === 's') {
    let options = { "units": "frames" }
    saveGif('20250112_genuary', 2 * PI * 100, options);
  }
}