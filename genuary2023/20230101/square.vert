#version 300 es
#define PI radians(180.0)
precision mediump float;

in vec3 aPosition;

out vec2 v_uv;
out vec4 v_color;

uniform float u_SlowTime;
uniform float u_ShapeSize;

/* goal

wanna draw a square using a vertex shader.

/* strategy

we can draw a circle. do something clever to make the x or y
pos not move at certain times. i think we can do this by cleverly
using sin and cos.

i don't totally get why we have to `-=` (or `+=`) in order to see something
moving on the screen. but if i change the position by 0 the dot won't move.

that's like, tautological, but it helps me think about when `pos.x` and 
`pos.y` shouldn't move.
*/


void main() {

  // grab the vertex xy pos
  vec4 pos = vec4(aPosition, 1.0);

  // the pos is magically remembered between frames, even though we're generating
  // new triangles every frame, 🤔
  //
  // += starts at top of frame
  // -= starts at bottom of frame
  float xTime, yTime;
  xTime = u_SlowTime;
  yTime = u_SlowTime;
  pos.x -= smoothstep(-u_ShapeSize, u_ShapeSize, sin(xTime)) - 0.5;
  pos.y -= smoothstep(-u_ShapeSize, u_ShapeSize, cos(yTime)) - 0.5;
  
  // Required output, the position in NDC space
  gl_Position = pos;
  
  // Write `out` attributes required by the fragment shader
  v_color = vec4(0.2275, 0.6627, 0.1882, 1.0);
  v_uv = aPosition.xy;
}

/* notes

something like this makes the x value bounce and go the other direction
halfway through the cycle, but that's not what we want

pos.x -= (sin(u_SlowTime) * 0.7) * sign(sin(u_SlowTime));

i thought i could do something like this, but i couldn't figure out the phasing:
pos.x -= (sin(u_SlowTime) * 0.7) * step(sin(u_SlowTime), 0.0);

i also didn't think about the "negative" component—needed to multiply by
two and subtract one.

notes */