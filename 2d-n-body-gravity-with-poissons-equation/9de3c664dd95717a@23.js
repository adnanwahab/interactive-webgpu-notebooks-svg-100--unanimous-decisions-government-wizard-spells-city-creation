// https://observablehq.com/@rreusser/glsl-fft@23
function _1(md){return(
md`# GLSL FFT`
)}

function _2(md){return(
md`This is a copied and very slightly modified version of the [glsl-fft](https://github.com/rreusser/glsl-fft) node module. That module has a number of rigorous tests and more information about usage.`
)}

function _LICENSE(){return(
"mit"
)}

function _glslWavenumber(){return(
`
#ifndef TWOPI
#define TWOPI (3.14159265358979 * 2.0)
#endif

float wavenumber (float resolution, float dx) {
  float x = (gl_FragCoord.x - 0.5) * resolution;
  return ((x < 0.5) ? x : x - 1.0) * (TWOPI / dx);
}

vec2 wavenumber (vec2 resolution, vec2 dxy) {
  vec2 xy = (gl_FragCoord.xy - 0.5) * resolution;
  return vec2(
    (xy.x < 0.5) ? xy.x : xy.x - 1.0,
    (xy.y < 0.5) ? xy.y : xy.y - 1.0
  ) * TWOPI / dxy;
}
`
)}

function _planFFT(){return(
function planFFT(opts) {
  function isPowerOfTwo(n) {
    return n !== 0 && (n & (n - 1)) === 0;
  }

  function checkPOT(label, value) {
    if (!isPowerOfTwo(value)) {
      throw new Error(
        label + ' must be a power of two. got ' + label + ' = ' + value
      );
    }
  }
  var i, ping, pong, uniforms, tmp, width, height;

  opts = opts || {};
  opts.forward = opts.forward === undefined ? true : opts.forward;
  opts.splitNormalization =
    opts.splitNormalization === undefined ? true : opts.splitNormalization;

  function swap() {
    tmp = ping;
    ping = pong;
    pong = tmp;
  }

  if (opts.size !== undefined) {
    width = height = opts.size;
    checkPOT('size', width);
  } else if (opts.width !== undefined && opts.height !== undefined) {
    width = opts.width;
    height = opts.height;
    checkPOT('width', width);
    checkPOT('height', width);
  } else {
    throw new Error('either size or both width and height must provided.');
  }

  // Swap to avoid collisions with the input:
  ping = opts.ping;
  if (opts.input === opts.pong) {
    ping = opts.pong;
  }
  pong = ping === opts.ping ? opts.pong : opts.ping;

  var passes = [];
  var xIterations = Math.round(Math.log(width) / Math.log(2));
  var yIterations = Math.round(Math.log(height) / Math.log(2));
  var iterations = xIterations + yIterations;

  // Swap to avoid collisions with output:
  if (opts.output === (iterations % 2 === 0 ? pong : ping)) {
    swap();
  }

  // If we've avoiding collision with output creates an input collision,
  // then you'll just have to rework your framebuffers and try again.
  if (opts.input === pong) {
    throw new Error(
      [
        'not enough framebuffers to compute without copying data. You may perform',
        'the computation with only two framebuffers, but the output must equal',
        'the input when an even number of iterations are required.'
      ].join(' ')
    );
  }

  for (i = 0; i < iterations; i++) {
    uniforms = {
      input: ping,
      output: pong,
      horizontal: i < xIterations,
      forward: !!opts.forward,
      resolution: [1.0 / width, 1.0 / height]
    };

    if (i === 0) {
      uniforms.input = opts.input;
    } else if (i === iterations - 1) {
      uniforms.output = opts.output;
    }

    if (i === 0) {
      if (!!opts.splitNormalization) {
        uniforms.normalization = 1.0 / Math.sqrt(width * height);
      } else if (!opts.forward) {
        uniforms.normalization = 1.0 / width / height;
      } else {
        uniforms.normalization = 1;
      }
    } else {
      uniforms.normalization = 1;
    }

    uniforms.subtransformSize = Math.pow(
      2,
      (uniforms.horizontal ? i : i - xIterations) + 1
    );

    passes.push(uniforms);

    swap();
  }

  return passes;
}
)}

function _createFFTPassCommand(){return(
function createFFTPassCommand(regl) {
  return regl({
    frag: `
    precision highp float;

    uniform sampler2D uSrc;
    uniform vec2 uResolution;
    uniform float uSubtransformSize, uNormalization;
    uniform bool uHorizontal, uForward;

    const float TWOPI = 6.283185307179586;

    vec4 fft (
      sampler2D src,
      vec2 resolution,
      float subtransformSize,
      bool horizontal,
      bool forward,
      float normalization
    ) {
      vec2 evenPos, oddPos, twiddle, outputA, outputB;
      vec4 even, odd;
      float index, evenIndex, twiddleArgument;

      index = (horizontal ? gl_FragCoord.x : gl_FragCoord.y) - 0.5;

      evenIndex = floor(index / subtransformSize) *
        (subtransformSize * 0.5) +
        mod(index, subtransformSize * 0.5) +
        0.5;

      if (horizontal) {
        evenPos = vec2(evenIndex, gl_FragCoord.y);
        oddPos = vec2(evenIndex, gl_FragCoord.y);
      } else {
        evenPos = vec2(gl_FragCoord.x, evenIndex);
        oddPos = vec2(gl_FragCoord.x, evenIndex);
      }

      evenPos *= resolution;
      oddPos *= resolution;

      if (horizontal) {
        oddPos.x += 0.5;
      } else {
        oddPos.y += 0.5;
      }

      even = texture2D(src, evenPos);
      odd = texture2D(src, oddPos);

      twiddleArgument = (forward ? TWOPI : -TWOPI) * (index / subtransformSize);
      twiddle = vec2(cos(twiddleArgument), sin(twiddleArgument));

      return (even.rgba + vec4(
        twiddle.x * odd.xz - twiddle.y * odd.yw,
        twiddle.y * odd.xz + twiddle.x * odd.yw
      ).xzyw) * normalization;
    }

    void main () {
      gl_FragColor = fft(uSrc, uResolution, uSubtransformSize, uHorizontal, uForward, uNormalization);
    }`,
    uniforms: {
      uSrc: regl.prop('input'),
      uResolution: regl.prop('resolution'),
      uSubtransformSize: regl.prop('subtransformSize'),
      uHorizontal: regl.prop('horizontal'),
      uForward: regl.prop('forward'),
      uNormalization: regl.prop('normalization')
    },
    framebuffer: regl.prop('output')
  });
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("LICENSE")).define("LICENSE", _LICENSE);
  main.variable(observer("glslWavenumber")).define("glslWavenumber", _glslWavenumber);
  main.variable(observer("planFFT")).define("planFFT", _planFFT);
  main.variable(observer("createFFTPassCommand")).define("createFFTPassCommand", _createFFTPassCommand);
  return main;
}
