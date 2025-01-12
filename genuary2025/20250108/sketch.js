canvasWidth = 400;
canvasHeight = 400;

let movers = [];
let total_movers = 0;
let num_movers = 150;

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  colorMode(HSB);
  
  var mover_ind = 0;
  var initial_velocity = 0.5;
  var depth_correction = 1;
  // let's get janky
  for (let group_ind = 0; group_ind >= -3000; group_ind -= 500){
    for (ind = 0; ind < num_movers; ind++) {
      movers[mover_ind] = new Mover(
        group_ind, initial_velocity, depth_correction
      );
      mover_ind++;
    }
    initial_velocity += 2;
    depth_correction += 0.66;
  }

  total_movers = mover_ind;

}

function draw() {
  background(15, 20, 20);
  for (ind = 0; ind < total_movers; ind++) {
    movers[ind].draw();
  }
  
}

class Mover {
  constructor(z_pos, initial_velocity, depth_correction) {
    this.z_pos = z_pos;
    this.correctedWidth = depth_correction * canvasWidth;
    this.correctedHeight = depth_correction * canvasHeight;
    let start_x = random(-this.correctedWidth / 2, this.correctedWidth / 2);
    let start_y = random(-this.correctedHeight / 2, this.correctedHeight / 2);
    this.xy_pos = createVector(start_x, start_y);
    this.initial_velocity = initial_velocity;
    this.velocity = createVector(-this.initial_velocity, this.initial_velocity);
    this.brightness_offset = random(0, 1000);
    this.hue_offset = random(0, 1000);
    this.item_color = [this.hue_offset, 80, 20];
    let x_param = random(0, 1);
    let y_param = random(0, 1);
    let z_param = random(0, 1);
    this.axis = createVector(x_param, y_param, z_param);
    this.rotation_rate = random(-0.05, 0.05);
    this.rotation = random(-0.4, 0.4);
    this.depth_correction = depth_correction;
  }

  // calculate_rotation_params() {
    
  //   this.axis.add(x_param, y_param, z_param)
  // }

  draw() {
    let x_perturbation = random(-0.2, 0.2);
    let y_perturbation = random(-0.2, 0.2);
    let hue = 40 * sin((frameCount + this.hue_offset) / 50);
    let brightness = 235 * sin((frameCount + this.brightness_offset) / 50) + 200;
    this.item_color[0] = hue;
    this.item_color[2] = brightness;
    

    // position calculation
    this.xy_pos.add(this.velocity);
    this.xy_pos.x += x_perturbation;
    this.xy_pos.y += y_perturbation;
    this.rotation += this.rotation_rate;

    if (this.xy_pos.x < -this.correctedWidth / 2) {
      this.xy_pos.x += this.correctedWidth;
      this.velocity = createVector(-this.initial_velocity, this.initial_velocity);
    }
    if (this.xy_pos.y > this.correctedHeight / 2) {
      this.xy_pos.y -= this.correctedHeight;
      this.velocity = createVector(-this.initial_velocity, this.initial_velocity);
    }

    push();
    translate(this.xy_pos.x, this.xy_pos.y, this.z_pos);
    rotate(this.rotation, this.axis);
    stroke(this.item_color);
    fill(this.item_color);
    strokeWeight(2);
    // square(x, y, side_length, tl_radius, tr_radius, br_radius, bl_radius)
    square(0, 0, 7);
    pop();
  }
}

function keyPressed() {
  if (key === 's') {
    let options = {"units": "frames"}
    saveGif('20250108_genuary', 500, options);
  }
}