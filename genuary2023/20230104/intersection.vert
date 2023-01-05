#version 300 es
#define PI radians(180.0)
#define NUM_SQUARES 5 // ugly!!
precision mediump float;

in vec3 aPosition;

out vec2 v_uv;
out vec4 v_color;


// https://stackoverflow.com/a/4275343/650427
// turns out this is actually a hash function :(
float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}


void main() {
  // grab the vertex xy pos
  // wait, why is this a vec4??? i forgot everything already
  vec4 pos = vec4(aPosition, 1.0);

  // normalize our coords
  pos.xy = pos.xy * 2.0 - 1.0;

  // Required output, the position in NDC space
  gl_Position = pos;
  
  // Write `out` attributes required by the fragment shader
  v_color = vec4(0.0, 0.0, 0.0, 1.0);
  v_uv = aPosition.xy;
}
