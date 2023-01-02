#version 300 es
#define PI radians(180.0)
#define NUM_SQUARES 5 // ugly!!
precision mediump float;

in vec3 aPosition;

out vec2 v_uv;
out vec4 v_color;

uniform float u_NumParticles;
uniform float u_SquareCenterCoordsX[NUM_SQUARES];
uniform float u_SquareCenterCoordsY[NUM_SQUARES];
uniform float u_SlowTime;
uniform float u_ShapeSize;

/* goal

draw more squares, only code for 10 min

/* strategy

panic at the taco bell

*/


void main() {
  // calculate an id for each vertex. six vertices should have the same
  // id because they are all associated with one mesh, i guess.
  int id = int(floor(float(gl_VertexID)  / 6.0));

  // grab the vertex xy pos
  vec4 pos = vec4(aPosition, 1.0);

  // the pos is magically remembered between frames, even though we're generating
  // new triangles every frame, 🤔
  pos.x -= smoothstep(-u_ShapeSize, u_ShapeSize, sin(u_SlowTime)) - u_SquareCenterCoordsX[id];
  pos.y -= smoothstep(-u_ShapeSize, u_ShapeSize, cos(u_SlowTime)) - u_SquareCenterCoordsY[id];
  
  // Required output, the position in NDC space
  gl_Position = pos;
  
  // Write `out` attributes required by the fragment shader
  v_color = vec4(0.2275, 0.6627, 0.1882, 1.0);
  v_uv = aPosition.xy;
}

/* notes

i am having trouble passing the center coords in for the squares from javascript. it seems like 
no matter what, the center value being used is [0, 0].

i ended up just trying something different. instead of passing a vector of float2s, i passed
two vectors of floats. it's only a little bit dumber, and maybe i can figure out how to
do the former later.

notes */