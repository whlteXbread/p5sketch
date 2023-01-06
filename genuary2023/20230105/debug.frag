#version 300 es
#define PI radians(180.0)
#define TWO_PI radians(360.0)
#define NUM_POLYGONS 13 // ugly!!
precision mediump float;

uniform vec2 u_Resolution;
uniform float u_SlowTime;
uniform float u_polygonCenterCoordsX[NUM_POLYGONS];
uniform float u_polygonCenterCoordsY[NUM_POLYGONS];

in vec2 v_uv;
in vec4 v_color;

out vec4 fragColor;

/* goal

draw some polygons that change color when they intersect

/* strategy

the same thing i do every night—steal some of adam ferriss' code

*/

vec3 normalizeRGB(float r, float g, float b) {
    return vec3(r / 255.0, g / 255.0, b / 255.0);
}

vec4 polygon(float centerX, float centerY, float size, float sides, float rotation, vec3 color) {
    // get the current coordinate
    vec2 coord = gl_FragCoord.xy;

    // center around our center coord
    vec2 pos = vec2(centerX, centerY) - coord;

    // "calculate the angle of the pixel" (?) relative to our adjusted position
    float angle = atan(pos.x, pos.y) + PI + rotation;

    // calculate the size of our shape
    float radius = TWO_PI / sides;

    /* adam ferriss' comment verbatim:
    // this is the function that controls our shapes appearance
    // i pulled it from the book of shaders shapes page https://thebookofshaders.com/07/
    // essentially what we are doing here is computing a circle with length(pos) and manipulating it's shape with the cos() function
    // this technique is really powerful and can be used to create all sorts of different shapes
    // for instance, try changing cos() to sin()
    */
    float d = cos(floor(0.5 + angle / radius) * radius - angle) * length(pos);

    // restrict the shape to black and white and set its size
    // smoothstep gives it a soft edge.
    d = 1.0 - smoothstep(size * 0.5, size * 0.5 + 1.0, d);

    // return the color with the shape as the alpha channel
    return vec4(color, d);
}

void main() {
    float size = 120.0;
    float sides = 5.0;
    float rotation = u_SlowTime;

    vec3 blue = normalizeRGB(0.0, 0.0, 255.0);
    vec3 green = normalizeRGB(0.0, 255.0, 0.0);
    vec3 red = normalizeRGB(255.0, 0.0, 0.0);
    vec3 gray = normalizeRGB(150.0, 160.0, 180.0);

    vec3 polygonColors[NUM_POLYGONS] = vec3[NUM_POLYGONS](gray, gray, gray, gray, gray, gray, gray, gray, gray, gray, green, gray, gray);
    float rotationDirecton[NUM_POLYGONS] = float[NUM_POLYGONS](-1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0);

    vec3 fragRGB = vec3(0.0);
    for (int i = 0; i < NUM_POLYGONS; i++) {
        vec4 aPolygon = polygon(u_polygonCenterCoordsX[i], u_polygonCenterCoordsY[i], size, sides, rotation * rotationDirecton[i], polygonColors[i]);
        fragRGB += aPolygon.rgb * aPolygon.a;
    }

    fragColor = vec4(fragRGB, 1.0);
}

/* notes

this took me entirely too long to figure out.

notes */