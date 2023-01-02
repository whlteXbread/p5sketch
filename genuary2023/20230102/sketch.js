let squareShader;
let renderer;

const squareCenterCoords = [];

function preload() {
  // load the shader.
  squareShader = loadShader("square_multi.vert", "square_multi.frag");
}

function setup() {
  // set up our canvas
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60.0);
  noStroke();

  squareCenterCoords.push([0.5, 0.5]);
  squareCenterCoords.push([0.9, 0.1]);
  squareCenterCoords.push([0.9, 0.9]);
  squareCenterCoords.push([0.1, 0.1]);
  squareCenterCoords.push([0.1, 0.9]);

  // i don't think you can push a vector of float2s into the fragment shader.
  console.log(squareCenterCoords);
}

function draw() {
  background(4, 16, 3);
  // start the thing
  shader(squareShader);

  // set up our uniforms
  let numParticles = 5.0;
  let slowTime = millis() / 1000.0;
  let shapeSize = 0.5;
  const squareCenterCoordsX = [];
  const squareCenterCoordsY = [];
  for (let i = 0; i < numParticles; i++) {
    // add a tiny amount of spice just because i guess
    squareCenterCoordsX.push(squareCenterCoords[i][0] + (0.0125 * random()));
    squareCenterCoordsY.push(squareCenterCoords[i][1] + (0.0125 * random()));
  }

  // send the shaders some useful data
  // to the vertex shader
  squareShader.setUniform("u_NumParticles", numParticles);
  squareShader.setUniform('u_SlowTime', slowTime);
  squareShader.setUniform('u_ShapeSize', shapeSize);
  squareShader.setUniform('u_SquareCenterCoordsX', squareCenterCoordsX);
  squareShader.setUniform('u_SquareCenterCoordsY', squareCenterCoordsY);
  // to the fragment shader
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