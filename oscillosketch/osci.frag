precision mediump float;

#define max_iter 100

const float softness = 500.0;
const vec4 bgColor = vec4(0.0157, 0.0627, 0.0118, 1.0);

uniform vec2 uRes;
uniform float uTime;
uniform float uSlowTime;
uniform int uParticles;


float softEdge(float edge, float amt) {
    // calculate an alpha value. i don't totally follow but this and `edge` or `l`, the 
    // dot product of the current coordinate with itself, are key to actually drawing anything.
    return clamp(1.0 / (edge * amt), 0.0, 1.0);
}

void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float aspect = uRes.x / uRes.y;
    
    gl_FragColor = bgColor;
    
    float xFactor = 100.0 * cos(uSlowTime);
    float yFactor = 100.0 * sin(uSlowTime);
    for(int i = 0; i< max_iter; i++){
        // grab current pixel position
        vec2 tc = uv;
 
        // we could do these calcs on the CPU since technically they're the same for every frame,
        // but the experiment i just did didn't show that offloaded work from the GPU.
        // i probably just don't understand what's going on.
        tc.x -= sin(uTime*1.125 + (float(i)/float(uParticles)) * xFactor * 0.2) * 0.4;
        tc.y -= cos(uTime*1.025 + (float(i)/float(uParticles)) * yFactor * 0.2) * 0.4;
        
        // translate so we're drawing using the whole canvas, not just the top right corner
        vec2 cc = tc * 2.0 - 1.0;
        // correct for the aspect ratio of the canvas
        cc.x *= aspect;
        // set the "size" of the particles we're drawing.
        // really i think we're setting the number of pixels that the gradient between orb color
        // and bg color should take.
        float l = dot(cc * 5.0, cc * 5.0);

        // set the orb color, and maybe more importantly, the alpha.
        vec4 orb = vec4(vec3(0.2275, 0.6627, 0.1882), softEdge(l, softness));
		
        // blend the color of the dot to the background color.
        gl_FragColor = mix(gl_FragColor, orb, orb.a);

        // hack so we can set the number of particles (up to 100) in the JS.
        if (i == uParticles - 1) {
            break;
        }
    }
}