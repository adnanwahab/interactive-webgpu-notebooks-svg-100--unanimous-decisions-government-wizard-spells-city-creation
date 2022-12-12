// https://observablehq.com/@rreusser/sdf-points-with-regl@720
import define1 from "./ab07a49dc1b41864@195.js";

function _1(md){return(
md`# SDF Points with [regl](https://github.com/regl-project/regl)`
)}

function _2(md){return(
md`This notebook illustrates a basic strategy for drawing SDF points using the [regl](https://github.com/regl-project/regl) WebGL library together with [svg-path-sdf](https://github.com/dy/svg-path-sdf). It uses point primitives, so for larger points, instanced rendering with billboarded sprites (two-triangle quads) would be necessary.

In short, we rasterize an SDF shape, turn it into a signed distance function (SDF), pass the image to a WebGL texture, and then use a fragment shader to construct the desired appearance.

If you'll forgive me, the goal wasn't really to make a step-by-step walkthrough, but to instead make a relatively simple SDF point renderer which gets all of the details like border width, pixel ratio scaling, and antialiasing pretty much correct. You're free to adapt the approach and use it however you see fit!`
)}

function _pixelRatio(Inputs){return(
Inputs.range([0.5, 3], {
  value: devicePixelRatio,
  label: "Pixel ratio",
  step: 0.5
})
)}

function _shape(Inputs){return(
Inputs.select(
  ["circle", "triangle", "square", "pentagon", "hexagon", "star", "plus"],
  {
    label: "Shape",
    value: "star"
  }
)
)}

function _pointProps(Inputs,MAX_POINTS,html)
{
  const inputs = {
    count: Inputs.range([1, MAX_POINTS], {
      value: 500,
      label: "Point count",
      transform: Math.log,
      step: 1
    }),
    pointSize: Inputs.range([1, 50], {
      value: 20,
      label: "Point size",
      step: 0.01,
      transform: Math.log
    }),
    borderWidth: Inputs.range([0, 20], {
      label: "Border width",
      step: 0.1,
      value: 2
    }),
    borderColor: Inputs.color({ value: "#000000", label: "Border color" }),
    opacity: Inputs.range([0, 1], {
      value: 1,
      label: "Opacity",
      step: 0.01
    }),
    aaWidth: Inputs.range([0, 5], {
      value: 0.5,
      label: "Anti-alias width",
      step: 0.1
    })
  };
  function update() {
    ret.value = {};
    for (const [name, input] of Object.entries(inputs)) {
      ret.value[name] = input.value;
    }
  }
  Object.values(inputs).forEach((input) =>
    input.addEventListener("input", update)
  );
  const ret = html`${Object.values(inputs)}`;
  ret.value = {};
  update();
  return ret;
}


function _regl(reglCanvas,width,pixelRatio){return(
reglCanvas(this, {
  width,
  height: width * 0.7,
  pixelRatio
})
)}

function _sdfDimension(Inputs){return(
Inputs.range([10, 400], {
  value: 200,
  label: "SDF size",
  step: 1,
  transform: Math.log
})
)}

function _sdfData(pathSdf,svg,sdfDimension,DOM)
{
  // Compute the SDF
  const sdf = pathSdf(svg, { width: sdfDimension, height: sdfDimension });

  // Convert single-channel float to RGBA uint8
  const data = new Uint8ClampedArray(sdf.length * 4);
  for (let i = 0; i < sdf.length; i++) {
    data[4 * i + 0] = sdf[i] * 255;
    data[4 * i + 1] = sdf[i] * 255;
    data[4 * i + 2] = sdf[i] * 255;
    data[4 * i + 3] = 255;
  }

  // Construct a preview
  const ctx = DOM.context2d(sdfDimension, sdfDimension, 1);
  const imgData = ctx.getImageData(0, 0, sdfDimension, sdfDimension);
  imgData.data.set(data);
  ctx.putImageData(imgData, 0, 0);

  // Assign the output to the cell value
  ctx.canvas.value = data;

  return ctx.canvas;
}


function _sdf(regl,sdfData,sdfDimension,invalidation)
{
  const texture = regl.texture({
    data: sdfData,
    min: "linear",
    mag: "linear",
    width: sdfDimension,
    height: sdfDimension
  });
  invalidation.then(() => texture.destroy());
  return texture;
}


async function _pathSdf(){return(
(await import("https://cdn.skypack.dev/svg-path-sdf")).default
)}

function _svg(shape){return(
{
  circle: "M40,0A40,40 0 1,1 0,-40A40,40 0 0,1 40,0Z",
  triangle: `M${[0, 1, 2]
    .map(
      (i) =>
        `${Math.sin((i / 3) * 2 * Math.PI)},${-Math.cos((i / 3) * 2 * Math.PI)}`
    )
    .join("L")}Z`,
  square: `M1,1L-1,1L-1,-1L1,-1Z`,
  pentagon: `M${[0, 1, 2, 3, 4]
    .map(
      (i) =>
        `${Math.sin((i / 5) * 2 * Math.PI)},${-Math.cos((i / 5) * 2 * Math.PI)}`
    )
    .join("L")}Z`,
  hexagon: `M${[0, 1, 2, 3, 4, 5]
    .map(
      (i) =>
        `${Math.sin((i / 6) * 2 * Math.PI)},${-Math.cos((i / 6) * 2 * Math.PI)}`
    )
    .join("L")}Z`,
  star: `M${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map(
      (i) =>
        `${Math.sin((i / 10) * 2 * Math.PI) * (i % 2 === 1 ? 0.5 : 1)},${
          -Math.cos((i / 10) * 2 * Math.PI) * (i % 2 === 1 ? 0.5 : 1)
        }`
    )
    .join("L")}Z`,
  plus: `M4,1L1,1L1,4L-1,4L-1,1L-4,1L-4,-1L-1,-1L-1,-4L1,-4L1,-1L4,-1Z`
}[shape]
)}

function _update(regl,drawPoints,sdf,colorscale,pointProps)
{
  function update() {
    regl.poll();
    drawPoints({
      sdf,
      colorscale,
      ...pointProps
    });
  }
  update();
  return update;
}


function _MAX_POINTS(){return(
100000
)}

function _drawPoints(regl,MAX_POINTS,d3){return(
regl({
  vert: `
    precision highp float;
    attribute float index;
    uniform float pointSize, n;
    uniform sampler2D colorscale;
    uniform vec2 res;
    varying vec3 color;
    const float pi = ${Math.PI};
    void main () {
      // Make up a position
      const float phi = ${Math.PI * (3 - Math.sqrt(5))};
      float r = sqrt(index / (n - 1.0)) * (length(res) / res.x) * 0.707;
      float theta = index * phi * (r < 1e-8 ? 0.0 : 1.0);
      gl_Position = vec4(0.9 * vec2(cos(theta), sin(theta) * res.x / res.y) * r * 1.57, 0, 1);

      // Sample up a color (for efficiency, in the vert shader, then pass to the fragment shader)
      color = texture2D(colorscale, vec2(fract(theta / pi), 0.5)).rgb;

      gl_PointSize = pointSize;
    }`,
  frag: `
    precision highp float;
    uniform sampler2D sdf;
    uniform float pointSize, borderWidth, aaWidth, opacity;
    uniform vec3 borderColor;
    varying vec3 color;

    float linearstep(float edge0, float edge1, float x) {
      return  clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    }

    void main () {
      // 0.5 corresponds to the shape, so compute an SDF relative to that value
      float sdf = (texture2D(sdf, gl_PointCoord.xy).r - 0.5) * pointSize * 0.5;

      float alpha = 0.0 + linearstep(-borderWidth * 2.0 - aaWidth, -borderWidth * 2.0 + aaWidth, sdf) * opacity;
      vec3 col = borderWidth == 0.0
        ? color
        : mix(borderColor, color, linearstep(-aaWidth, aaWidth, sdf));

      if (alpha == 0.0) discard;

      // Use pre-multiplied alpha to get the blending correct
      gl_FragColor = vec4(vec3(col), 1) * alpha;
    }`,
  attributes: {
    index: new Array(MAX_POINTS).fill(0).map((_, i) => i)
  },
  blend: {
    enable: true,
    func: {
      srcRGB: 1,
      srcAlpha: 1,
      dstRGB: "one minus src alpha",
      dstAlpha: "one minus src alpha"
    }
  },
  depth: { enable: false },
  uniforms: {
    res: (ctx) => [ctx.viewportWidth, ctx.viewportHeight],
    n: regl.prop("count"),
    sdf: regl.prop("sdf"),
    // Double the size since the SDF is relative to the 0.5 value
    pointSize: (ctx, props) => ctx.pixelRatio * props.pointSize * 2.0,
    borderWidth: (ctx, props) =>
      ctx.pixelRatio *
      Math.min(
        props.borderWidth * 0.5,
        // Limit the border size since the buffer around the SDF is only so big
        (props.pointSize - (2.0 * props.aaWidth) / ctx.pixelRatio) * 0.25
      ),
    colorscale: regl.prop("colorscale"),
    aaWidth: regl.prop("aaWidth"),
    opacity: regl.prop("opacity"),
    borderColor: (ctx, props) => {
      const c = d3.rgb(props.borderColor);
      return [c.r / 255, c.g / 255, c.b / 255];
    }
  },
  primitive: "point",
  count: regl.prop("count")
})
)}

function _d3(require){return(
require("d3@7")
)}

function _colorscale(regl,d3,invalidation)
{
  const texture = regl.texture({
    width: 256,
    height: 1,
    min: "linear",
    mag: "linear",
    data: d3
      .quantize(d3.interpolateRainbow, 256)
      .map((c) => {
        return (c = d3.rgb(c)), [c.r, c.g, c.b, 1];
      })
      .flat()
  });
  invalidation.then(() => texture.destroy());
  return texture;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof pixelRatio")).define("viewof pixelRatio", ["Inputs"], _pixelRatio);
  main.variable(observer("pixelRatio")).define("pixelRatio", ["Generators", "viewof pixelRatio"], (G, _) => G.input(_));
  main.variable(observer("viewof shape")).define("viewof shape", ["Inputs"], _shape);
  main.variable(observer("shape")).define("shape", ["Generators", "viewof shape"], (G, _) => G.input(_));
  main.variable(observer("viewof pointProps")).define("viewof pointProps", ["Inputs","MAX_POINTS","html"], _pointProps);
  main.variable(observer("pointProps")).define("pointProps", ["Generators", "viewof pointProps"], (G, _) => G.input(_));
  main.variable(observer("viewof regl")).define("viewof regl", ["reglCanvas","width","pixelRatio"], _regl);
  main.variable(observer("regl")).define("regl", ["Generators", "viewof regl"], (G, _) => G.input(_));
  main.variable(observer("viewof sdfDimension")).define("viewof sdfDimension", ["Inputs"], _sdfDimension);
  main.variable(observer("sdfDimension")).define("sdfDimension", ["Generators", "viewof sdfDimension"], (G, _) => G.input(_));
  main.variable(observer("viewof sdfData")).define("viewof sdfData", ["pathSdf","svg","sdfDimension","DOM"], _sdfData);
  main.variable(observer("sdfData")).define("sdfData", ["Generators", "viewof sdfData"], (G, _) => G.input(_));
  main.variable(observer("sdf")).define("sdf", ["regl","sdfData","sdfDimension","invalidation"], _sdf);
  main.variable(observer("pathSdf")).define("pathSdf", _pathSdf);
  main.variable(observer("svg")).define("svg", ["shape"], _svg);
  const child1 = runtime.module(define1);
  main.import("reglCanvas", child1);
  main.variable(observer("update")).define("update", ["regl","drawPoints","sdf","colorscale","pointProps"], _update);
  main.variable(observer("MAX_POINTS")).define("MAX_POINTS", _MAX_POINTS);
  main.variable(observer("drawPoints")).define("drawPoints", ["regl","MAX_POINTS","d3"], _drawPoints);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("colorscale")).define("colorscale", ["regl","d3","invalidation"], _colorscale);
  return main;
}
