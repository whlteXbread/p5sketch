let osciShader;
let renderer;
let numParticles;

function preload() {
  // load the shader.
  osciShader = loadShader("osci.vert", "osci.frag");
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
  shader(osciShader);

  let numParticles = 100.0;
  let slowTime = millis() / 1000.0;
  let slowerTime = slowTime * 0.006;
  // for a reason i don't understand yet, if i try to pass these in
  // (instead of calculating them for each vertex), it changes the animation.
  let xAngle = slowTime * 1.125;
  let yAngle = slowTime * 1.025;
  let xFactor = 20.0 * Math.cos(slowerTime);
  let yFactor = 20.0 * Math.sin(slowerTime);

  // send the shaders some useful data
  osciShader.setUniform("u_NumParticles", numParticles);
  osciShader.setUniform('u_SlowTime', slowTime);
  osciShader.setUniform('u_xFactor', xFactor);
  osciShader.setUniform('u_yFactor', yFactor);
  osciShader.setUniform('u_xAngle', xAngle);
  osciShader.setUniform('u_yAngle', yAngle);
  osciShader.setUniform('u_Resolution', [width, height]);

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

  // beginShape(POINTS);
  // for (let i = 0; i < numParticles; i++) {
  //   vertex(0.01, 0.01);
  // }
  // endShape();
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