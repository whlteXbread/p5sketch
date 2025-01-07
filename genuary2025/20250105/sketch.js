canvasWidth = 400;
canvasHeight = 400;

let movers = [];
let num_start_points = 5;
let total_movers = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  let start_coords = [];
  for (let start_ind = 0; start_ind < num_start_points; start_ind++) {
    start_coords.push([start_ind * -(43.301) + (-43.301 * 4), start_ind * 25])
  }
  
  var mover_ind = 0;
  // let's get janky
  for (ind = 0; ind < start_coords.length; ind++) {
    movers[mover_ind] = new Mover(start_coords[ind], 40, 7);
    mover_ind++;
  }

  total_movers = mover_ind;
  // let options = {"units": "frames"}
  // saveGif('20250105_genuary', 400, options);
}

function draw() {
  background(64);
  for (ind = 0; ind < total_movers; ind++) {
    movers[ind].draw();
  }
  
}

class Mover {
  constructor(start_coord, line_length, max_coords) {
    this.start_coord = start_coord;
    this.line_length = line_length;
    this.max_coords = max_coords;
    this.coord_list = [start_coord];
    this.angle_list = [
      PI / 6,
      -PI / 6,
      PI / 6,
      5 * PI / 6,
    ];
    this.angle_ind = 0;
    this.draw_every = 2;
    this.wrap_next = false;
  }

  next_coord(start_coord, angle, magnitude) {
    let next_x = start_coord[0] + cos(angle) * magnitude;
    let next_y = start_coord[1] + sin(angle) * magnitude;
    return [next_x, next_y]
  }

  update_angle_ind() {
    this.angle_ind = (this.angle_ind + 1) % this.angle_list.length
  }

  draw() {
    // go forward
    if (frameCount % this.draw_every == 0){
      this.coord_list.push(this.next_coord(this.coord_list[this.coord_list.length - 1], this.angle_list[this.angle_ind], this.line_length))
      this.update_angle_ind()
    }
    // if (this.rate > 0) {
    //   this.x_pos = (this.x_pos + this.rate) % this.wrap_width;
    // } else if (this.rate < 0) {
    //   this.x_pos = (this.x_pos + this.rate);
    //   if (this.x_pos < 0) {
    //     this.x_pos += this.wrap_width;
    //   }
    // }
    let start_coord = [];
    let stop_coord = [];

    for (let coord_ind = 1; coord_ind < this.coord_list.length; coord_ind++) {
      push();
      // translate(this.x_pos, 0, 0);
      stroke(200);
      strokeWeight(2);
      start_coord = this.coord_list[coord_ind - 1];
      stop_coord = this.coord_list[coord_ind];
      line(start_coord[0], start_coord[1], stop_coord[0], stop_coord[1]);
      pop();
    }
    // trim the tail
    if (this.coord_list.length > this.max_coords) {
      this.coord_list.shift();
    }
    // are we off screen? check to see if the beginning of the last line is 
    // off canvas.
    if ((stop_coord[0] > canvasWidth) && (stop_coord[1] > canvasHeight) ||
        (stop_coord[0] < 0) && (stop_coord[1] < 0)) {
          let new_start = [stop_coord[0] % canvasWidth, stop_coord[1] % canvasHeight];
      this.coord_list = [new_start];
    }
  }
}

function keyPressed() {
  if (key === 's') {
    let options = {"units": "frames"}
    saveGif('20250105_genuary', 400, options);
  }
}