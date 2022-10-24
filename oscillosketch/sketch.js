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
  noStroke();
}



function draw() {
  // start the thing
  shader(osciShader);
  // send some info to the shader
  numParticles = 100;
  osciShader.setUniform("uTime", frameCount * 0.02);
  osciShader.setUniform("uSlowTime", frameCount * 0.0002)
  osciShader.setUniform("uRes", [width * pixelDensity(), height * pixelDensity()]);
  osciShader.setUniform("uMouse", [mouseX, mouseY]);
  osciShader.setUniform("uParticles", numParticles);
  // make some vertices to work with, i think
  plane(width, height);
}