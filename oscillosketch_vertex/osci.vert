#version 300 es
precision mediump float;

in vec3 aPosition;

out vec2 v_uv;
out vec4 v_color;

uniform float u_NumParticles;
uniform float u_SlowTime;
uniform float x_Angle;
uniform float y_Angle;
uniform float u_xFactor;
uniform float u_yFactor;

void main() {

  // calculate an id for each vertex. six vertices should have the same
  // id because they are all associated with one mesh, i guess.
  float id = floor(float(gl_VertexID)  / 6.0);
  // normalize the ID, because i guess
  float normalized_id = id / u_NumParticles;

  // grab the vertex xy pos
  vec4 pos = vec4(aPosition, 1.0);

  // the pos is magically remembered between frames, even though we're generating
  // new triangles every frame
  //
  // += starts at top of frame
  // -= starts at bottom of frame
  pos.x -= sin(u_SlowTime * 1.125 + (normalized_id * u_xFactor)) * 0.7;
  pos.y -= cos(u_SlowTime * 1.025 + (normalized_id * u_yFactor)) * 0.7;
  
  // Required output, the position in NDC space
  gl_Position = pos;
  
  // Write `out` attributes required by the fragment shader
  v_color = vec4(0.2275, 0.6627, 0.1882, 1.0);
  v_uv = aPosition.xy;
}