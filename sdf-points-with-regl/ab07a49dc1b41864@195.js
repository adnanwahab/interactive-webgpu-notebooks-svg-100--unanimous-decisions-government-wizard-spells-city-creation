// https://observablehq.com/@rreusser/regl-canvas@195
function _1(md){return(
md`# regl-canvas

A helper to create a regl canvas. Exists so that you may directly provide a width and height and then resize the notebook without causing it to create a new context—which would quickly run up against the WebGL context limit and result in blank figures. Creates a new context only when the configuration is changed in a way which requires it.

Options mirror the [regl constructor options](https://github.com/regl-project/regl/blob/master/API.md#all-initialization-options), with only a couple omissions and the addition of \`width\` and \`height\`. Options are:

- \`width\`: canvas width (Default: page \`width\`)
- \`height\`: canvas height: (Default: \`width * 0.5\`)
- \`createREGL\`: optional REGL constructor. If not provided, \`regl@latest\` is preferred.
- \`attributes\`: The [context creation attributes](https://www.khronos.org/registry/webgl/specs/1.0/#WEBGLCONTEXTATTRIBUTES) passed to the WebGL context constructor.
- \`pixelRatio\`: A multiplier which is used to scale the canvas size relative to the container.
- \`extensions\`: 	A list of extensions that must be supported by WebGL context. Default \`[]\`
- \`optionalExtensions\`: 	A list of extensions which are loaded opportunistically. Default \`[]\`
- \`profile\`: If set, turns on profiling for all commands by default. (Default \`false\`)
`
)}

function _regl(reglCanvas,width){return(
reglCanvas(this, {
  width,
  attributes: { antialias: true },
  extensions: ['OES_standard_derivatives']
})
)}

function _3(regl){return(
regl.clear({ color: [0.4, 0.3, 0.8, 1] })
)}

function _4(md){return(
md`## Implementation`
)}

function _defaultCreateREGL(require){return(
require('regl')
)}

function _reglCanvas(width,defaultCreateREGL,HTMLCanvasElement,DOM){return(
function reglCanvas(currentCanvas, opts) {
  opts = opts || {};
  const w = opts.width || width;
  const h = opts.height || Math.floor(w * 0.5);
  const createREGL = opts.createREGL || defaultCreateREGL;

  function normalizeConfig(opts) {
    const normalized = Object.assign(
      {},
      {
        pixelRatio: devicePixelRatio,
        attributes: {},
        extensions: [],
        optionalExtensions: [],
        profile: false
      },
      opts || {}
    );
    delete normalized.width;
    delete normalized.height;
    return normalized;
  }

  const config = normalizeConfig(opts);

  function preserveExisting(canvas, newConfig) {
    const currentConfig = canvas.config;
    if (JSON.stringify(currentConfig) !== JSON.stringify(newConfig)) {
      return false;
    }
    return canvas;
  }

  function resizeCanvas(canvas, width, height) {
    canvas.width = Math.floor(width * config.pixelRatio);
    canvas.height = Math.floor(height * config.pixelRatio);
    canvas.style.width = `${Math.floor(width)}px`;
    canvas.style.height = `${Math.floor(height)}px`;
  }

  if (currentCanvas) {
    if (!(currentCanvas instanceof HTMLCanvasElement)) {
      throw new Error(
        'Unexpected first argument type. Did you forget to pass `this` as the first argument?'
      );
    }
    resizeCanvas(currentCanvas, w, h);
    const existing = preserveExisting(currentCanvas, config);
    if (existing) return existing;
  }

  const canvas = DOM.element('canvas');
  // Clone the options since canvas creation mutates the `attributes` object,
  // causing false positives when we then use it to detect changed config.
  const regl = createREGL({ canvas, ...JSON.parse(JSON.stringify(config)) });
  resizeCanvas(canvas, w, h);
  canvas.value = regl;
  canvas.config = config;
  return canvas;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof regl")).define("viewof regl", ["reglCanvas","width"], _regl);
  main.variable(observer("regl")).define("regl", ["Generators", "viewof regl"], (G, _) => G.input(_));
  main.variable(observer()).define(["regl"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("defaultCreateREGL")).define("defaultCreateREGL", ["require"], _defaultCreateREGL);
  main.variable(observer("reglCanvas")).define("reglCanvas", ["width","defaultCreateREGL","HTMLCanvasElement","DOM"], _reglCanvas);
  return main;
}
