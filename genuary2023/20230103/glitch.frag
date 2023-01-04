#version 300 es
precision mediump float;

uniform vec2 u_Resolution;

in vec2 v_uv;
in vec4 v_color;

out vec4 fragColor;

void main() {
    vec2 uv = v_uv;
    
    // i don't totally understand what `v_uv` actually is, but this draws
    // a smooth dot somehow
    float d = length(uv);
    float a = 1.0 - smoothstep(0.0, 10.0/u_Resolution.y, d);

    fragColor = vec4(v_color.rgb, a);
}