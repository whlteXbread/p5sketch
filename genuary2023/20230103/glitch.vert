#version 300 es
#define PI radians(180.0)
#define NUM_SQUARES 5 // ugly!!
precision mediump float;

in vec3 aPosition;

out vec2 v_uv;
out vec4 v_color;

uniform float u_SquareCenterCoordsX[NUM_SQUARES];
uniform float u_SquareCenterCoordsY[NUM_SQUARES];
uniform float u_SlowTime;
uniform float u_ShapeSize;

/* goal

manipulate a single vertex "randomly" to create a glitch

/* strategy

panic at the taco bell

*/

// https://stackoverflow.com/a/4275343/650427
float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}


void main() {
  // calculate an id for each vertex. six vertices should have the same
  // id because they are all associated with one mesh, i guess.
  int id = int(floor(float(gl_VertexID)  / 6.0));

  // grab the vertex xy pos
  // wait, why is this a vec4??? i forgot everything already
  vec4 pos = vec4(aPosition, 1.0);

  // the pos is magically remembered between frames, even though we're generating
  // new triangles every frame, 🤔
  pos.x -= smoothstep(-u_ShapeSize, u_ShapeSize, sin(u_SlowTime)) - u_SquareCenterCoordsX[id];
  pos.y -= smoothstep(-u_ShapeSize, u_ShapeSize, cos(u_SlowTime)) - u_SquareCenterCoordsY[id];

  // flip a weighted coin
  float rand_value = (2.0 * rand(vec2(pos.x, pos.y))) - 1.0;
  if (rand_value > 0.975) {
    // heads i win
    pos.x += 0.05 * rand_value;
  }
  if (rand_value < -0.975) {
    // tails you lose
    pos.y += 0.05 * rand_value;
  }
  
  // Required output, the position in NDC space
  gl_Position = pos;
  
  // Write `out` attributes required by the fragment shader
  v_color = vec4(0.2275, 0.6627, 0.1882, 1.0);
  v_uv = aPosition.xy;
}

/* notes

notes */