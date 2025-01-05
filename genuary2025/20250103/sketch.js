canvasWidth = 500;
canvasHeight = 500;

let movers = [];
let spacing = 10;
let num_movers = 42;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
  var mover_ind = 0;
  // let's get janky
  var y_pos = 40;
  num_tabs = 0;
  for (ind = 0; ind < num_movers; ind++) {
    if (ind == 0) {
      num_tabs = 0;
    } else {
      num_tabs = floor(random(2, 7));
    }
    movers[ind] = new Mover(y_pos, num_tabs);
    y_pos += spacing;
  }
}

function draw() {
  background(64);
  for (ind = 0; ind < num_movers; ind++) {
    movers[ind].draw();
  }
  
}

class Mover {
  constructor(y_pos, num_tabs) {
    this.rate = floor(random(1, 8));
    this.y_pos = y_pos;
    this.x_start = 20 + (15 * num_tabs);
    this.x_stop = floor(random(this.x_start + 30, 300));
    this.breaks_in_line = floor(random(10,20));
    this.interval = (this.x_stop - this.x_start) / this.breaks_in_line;

    // initial points for the line
    this.points = this.generate_points();
  }

  generate_points() {
    let points = []
    let x_start_point = this.x_start;
    let x_stop_point = x_start_point + this.interval;
    let y_start_point = random(0, 5);
    let y_stop_point = random(0, 5);
    for (let ind = 0; ind < this.breaks_in_line; ind++) {
      x_start_point = x_stop_point;
      x_stop_point += this.interval;
      y_start_point = y_stop_point;
      y_stop_point = random(0,10);
      points.push([x_start_point, x_stop_point, y_start_point, y_stop_point]);
    }
    return points
  }

  draw() {
    push();
    translate(0, this.y_pos, 0);
    stroke(200);
    strokeWeight(2);
    // if this condition is met, draw a new line
    if ((frameCount % this.rate) == 0) {
      this.points = this.generate_points()
    }
    this.points.forEach((point) => {
      line(point[0], point[2], point[1], point[3]);
    })
    pop();
  }
}

function keyPressed() {
  if (key === 's') {
    let options = {"units": "frames"}
    saveGif('20250103_genuary', 60, options);
  }
}