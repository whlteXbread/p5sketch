let squareShader;
let renderer;

const polygonCenterCoords = [];

function preload() {
  // load the shader.
  squareShader = loadShader("intersection.vert", "intersection.frag");
}

function setup() {
  // set up our canvas
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(60.0);
  noStroke();

  // center
  polygonCenterCoords.push([width * 0.5, height * 0.5]);
  // inner ring
  polygonCenterCoords.push([width * 0.4, height * 0.4]);
  polygonCenterCoords.push([width * 0.4, height * 0.6]);
  polygonCenterCoords.push([width * 0.6, height * 0.4]);
  polygonCenterCoords.push([width * 0.6, height * 0.6]);
  // outer ring
  polygonCenterCoords.push([width * 0.3, height * 0.3]);
  polygonCenterCoords.push([width * 0.3, height * 0.5]);
  polygonCenterCoords.push([width * 0.3, height * 0.7]);
  polygonCenterCoords.push([width * 0.5, height * 0.3]);
  polygonCenterCoords.push([width * 0.5, height * 0.7]);
  polygonCenterCoords.push([width * 0.7, height * 0.3]);
  polygonCenterCoords.push([width * 0.7, height * 0.5]);
  polygonCenterCoords.push([width * 0.7, height * 0.7]);

}

function draw() {
  background(20, 20, 20);
  // start the thing
  shader(squareShader);

  // set up our uniforms
  let numParticles = 13.0;
  let slowTime = millis() / 1000.0;
  const polygonCenterCoordsX = [];
  const polygonCenterCoordsY = [];
  for (let i = 0; i < numParticles; i++) {
    // add a tiny amount of spice just because i guess
    polygonCenterCoordsX.push(polygonCenterCoords[i][0] + (2.5 * random()));
    polygonCenterCoordsY.push(polygonCenterCoords[i][1] + (2.5 * random()));
  }

  // send the shaders some useful data
  squareShader.setUniform("u_NumParticles", numParticles);
  squareShader.setUniform('u_SlowTime', slowTime);
  squareShader.setUniform('u_polygonCenterCoordsX', polygonCenterCoordsX);
  squareShader.setUniform('u_polygonCenterCoordsY', polygonCenterCoordsY);
  squareShader.setUniform('u_Resolution', [width, height]);


  // Enable noStroke for performance, we don't need p5js to stroke our geometry
  noStroke();

  rect(0, 0, width, height);
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