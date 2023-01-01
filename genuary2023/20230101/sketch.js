let squareShader;
let renderer;

function preload() {
  // load the shader.
  squareShader = loadShader("square.vert", "square.frag");
}

function setup() {
  // set up our canvas
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60.0);
  noStroke();
}

function draw() {
  background(4, 16, 3);
  // start the thing
  shader(squareShader);

  let numParticles = 1.0;
  let slowTime = millis() / 1000.0;
  let shapeSize = 0.5;

  // send the shaders some useful data
  squareShader.setUniform('u_SlowTime', slowTime);
  squareShader.setUniform('u_ShapeSize', shapeSize)
  squareShader.setUniform('u_Resolution', [width, height]);


  // Enable noStroke for performance, we don't need p5js to stroke our geometry
  noStroke();

  // why do these need to be triangles? why can't i use a point?
  beginShape(TRIANGLES);
  for (let i = 0; i < numParticles; i++) {
    // triangle 1
    vertex(-0.01, -0.01);
    vertex(-0.01, 0.01);
    vertex(0.01, 0.01);
    // triangle 2
    vertex(-0.01, -0.01);
    vertex(0.01, 0.01);
    vertex(0.01, -0.01);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Hack to enable WEBGL2 and set a sane blend mode
// https://github.com/processing/p5.js/issues/2536
// https://github.com/diwi/p5.EasyCam/blob/master/examples/ReactionDiffusion_Webgl2/ReactionDiffusion_Webgl2.js#L563
p5.RendererGL.prototype._initContext = function () {
  this.drawingContext = false ||
    this.canvas.getContext('webgl2', this.attributes) ||
    this.canvas.getContext('webgl', this.attributes) ||
    this.canvas.getContext('experimental-webgl', this.attributes);
  let gl = this.drawingContext;
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
};