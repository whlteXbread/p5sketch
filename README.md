# p5sketch
learning p5.js and webGL

## sketches
- [oscillosketch](https://whltexbread.github.io/p5sketch/oscillosketch/)
- [oscillosketch_vertex](https://whltexbread.github.io/p5sketch/oscillosketch_vertex/)
  - ostensibly the same animation, but the meat of the algorithm takes place in a vertex shader. i was hoping this would be much more efficient, but it doesn't look like that's the case. the code is way easier to read though.
- [genuary 20230101](https://whltexbread.github.io/p5sketch/genuary2023/20230101/)
  - prompt is "perfect loop/infinite loop". i repeatedly draw a square using a vertex shader. that's it. that's the tweet.

## acknowledgements
so far, i haven't done anything more than hack around on already-written code, specifically [Adam Ferriss' genuary repo](https://github.com/aferriss/genuary) and [Justin Shrake's vertex shader repo](https://github.com/jshrake/p5js-vertex-shader).

## notes
- using VSCode to write code, blus a couple helpful plugins:
	- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) will serve up your page/sketch and reload when you save. nice for quick iterations
	- [WebGL GLSL Editor](https://marketplace.visualstudio.com/items?itemName=raczzalan.webgl-glsl-editor) for syntax highlighting, signature info, and code completion in the shaders and offline documentation.
	- [p5.vscode](https://marketplace.visualstudio.com/items?itemName=samplavigne.p5-vscode) to help on the `p5.js` side of things.

## lessons learned
- [must use `const` to specify constraints on `for` loops](https://stackoverflow.com/questions/38986208/webgl-loop-index-cannot-be-compared-with-non-constant-expression/39298265#39298265)
- [looks better if you center the canvas](https://github.com/processing/p5.js/wiki/Positioning-your-canvas)
- if the fragment shader doesn't receive a uniform that it expects, it will just quietly fail

## resources
- [Adam Ferriss `genuary` 2022](https://github.com/aferriss/genuary)
- [p5.js shaders](https://itp-xstory.github.io/p5js-shaders/#/)
- [the book of shaders](https://thebookofshaders.com)
- [openGL api docs](https://docs.gl)
- [Justin Shrake's vertex shader repo](https://github.com/jshrake/p5js-vertex-shader)

## open questions
i really don't get why i can't just draw a vertex and have it show up somehow—feels like i shouldn't need to draw a square or a triangle in order for something to show up:

```javascript
// why do these need to be triangles? why can't i use a point?
  beginShape(TRIANGLES);
  for (let i = 0; i < numParticles; i++) {
    // triangle 1
    vertex(-0.01, -0.01);
    vertex(-0.01, 0.01);
    vertex(0.01, 0.01);
    // triangle 2
    vertex(-0.01, -0.01);
    vertex(0.01, 0.01);
    vertex(0.01, -0.01);
  }
  endShape();

  // beginShape(POINTS);
  // for (let i = 0; i < numParticles; i++) {
  //   vertex(0.01, 0.01);
  // }
  // endShape();
}
```