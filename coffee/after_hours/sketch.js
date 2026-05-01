let canvasWidth;
let canvasHeight;
let centerWidth;
let centerHeight;

let frequency_factor = 1 / 100;

function setup() {
  canvasWidth = 512;
  centerWidth = canvasWidth / 2;
  canvasHeight = 512;
  centerHeight = canvasHeight / 2;
  createCanvas(canvasWidth, canvasHeight);

  let bg_color = color(0, 12, 148);

  // let's get janky
  inner_planet = new Planet(-frequency_factor, 1, 130, 150, 2, bg_color);
  outer_planet = new Planet(frequency_factor / 3, 1, 200, 20);
}

function draw() {
  let bg_color = color(0, 12, 148);
  background(bg_color);

  outer_planet.calculate_frame_offsets();
  inner_planet.calculate_frame_offsets();

  draw_circles();
  inner_planet.draw();
  outer_planet.draw();
}

function draw_circles() {
  let num_circles = 40;
  let line_stroke = 1;
  let color_min = color(0, 12, 148);
  let color_max = color(224, 224, 224);
  var diameter = 0;
  var alpha = 0;

  // TODO: WHAT GIVES WITH THE DOT IN THE MIDDLE, IT SHOULDN'T BE THERE
  // apparently only happens if starting diameter > 0. feels like a bug?
  for (let num = 0; num < num_circles; num++) {
    alpha = lerp(0, 255, (num / num_circles));
    circle(centerWidth, centerHeight, diameter);
    stroke(color(224, alpha));
    noFill();
    strokeWeight(line_stroke);
    diameter += 8;
  }
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
    stroke(this.object_color);
    fill(this.object_color);
    strokeWeight(2);
    circle(centerWidth, centerHeight, this.size);
    pop();
  }
}

function keyPressed() {
  if (key === 's') {
    let options = { "units": "frames" }
    saveGif('after_hours', 2 * PI * 100, options);
  }
}