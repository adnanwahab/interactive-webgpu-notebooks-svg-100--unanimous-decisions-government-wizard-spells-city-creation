// https://observablehq.com/@rreusser/2d-n-body-gravity-with-poissons-equation@2888
import define1 from "./b1c1bcfaa4edd969@128.js";
import define2 from "./a82f06f54ea1d92b@1667.js";
import define3 from "./9b324adc60e147f8@231.js";
import define4 from "./e93997d5089d7165@2303.js";
import define5 from "./9de3c664dd95717a@23.js";

function _1(md,particleTextureRadius,tex,gridTextureRadius){return(
md`# 2D (Non-physical) N-body Gravity with Poisson's Equation

This notebook performs a more or less justified but not particularly accurate two-dimensional simulation of ${particleTextureRadius *
  particleTextureRadius} bodies interacting gravitationally on a periodic ${tex`${gridTextureRadius} \times ${gridTextureRadius}`} grid.

It visualizes the potential computed under **two-dimensional** Newtonian gravity, which means two things. First, there's nothing fancy like relativity or spacetime involved, and second that [Poisson's equation](https://en.wikipedia.org/wiki/Poisson%27s_equation) which describes gravitational potential works differently in two dimensions than in three so that gravity won't work quite like it does in our three-dimensional universe. Typically when we simulate gravity in a flat plane we use the three dimensional inverse square law and restrict motion to a plane. This notebook is different and computes gravity that really only lives in two dimensions. In this flat world, energy must still be conserved, of course, but we don't get an inverse square law; things don't pull on each other with quite the right strength and don't fall into nice elliptical orbits. It's still a great and fun exercise though!

Pairwise interactions of ${tex`n`} bodies scale with ${tex`O(n^2)`} so that adding up pairwise forces and integrating in time gets out of hand very quickly as ${tex`n`} grows. You can get around that with trees and the approximate [Barnes-Hut Method](https://en.wikipedia.org/wiki/Barnes%E2%80%93Hut_simulation) or the significantly more advanced [Fast Multipole Method](https://en.wikipedia.org/wiki/Fast_multipole_method).

This notebook takes a different approach. An obsolete approach, to be clear. It uses the [Particle Mesh (PM) method](https://en.wikipedia.org/wiki/Particle_Mesh) to compute forces. The core principle in this simulation is the [Poisson equation for Newtonian gravity](https://en.wikipedia.org/wiki/Poisson%27s_equation#Newtonian_gravity), ${tex.block`\nabla^2 \phi = 4 \pi G \rho,`} where ${tex`\phi`} is the gravitational potential, ${tex`G`} is the gravitational constant, and ${tex`\rho`} is the local mass density. Instead of computing forces, we aggregate the total mass density in each grid cell, solve for the gravitational potential ${tex`\phi`}, and compute for each body the resulting gravitational force ${tex`\mathbf{g}`}, ${tex.block`\mathbf{g} = -\nabla \phi.`}

*Edit: After some googling, I learned this method has a name. It's called the *[Particle Mesh Method](https://en.wikipedia.org/wiki/Particle_Mesh)*, appropriately enough. From the article,*

> PM is considered an obsolete method as it does not model close interaction between particles well. It has been supplanted by the [Particle-Particle Particle-Mesh method](https://en.wikipedia.org/wiki/P3M), which uses a straight particle-particle sum between nearby particles in addition to the PM calculation.

The rough steps of this method as implemented on the GPU are
1. Compute the density by drawing each body as a point on a texture. Use additive blending so that the output is a texture where each pixel counts the number of bodies in that cell.
2. Solve Poisson's equation for the gravitational potential. Solving this equation in the frequency domain means using the Fast Fourier Transform (see below for details).
3. Update particle positions and velocities where the gradient of the potential from step 2 is the acceleration felt by each particle.

This method tends to look a little wild since hundreds of thousands of bodies fly in every direction, so we perform one additional step and simulate Galileian-invariant (but physically questionable viscosity). To do this, we also compute a weighted average of the velocity as part of step 1, then in step 3 add to each body a force proportional to the difference between its velocity and the cell-average velocity. This pulls each mass toward the average velocity of that cell, though it does not conserve energy.`
)}

function _2(md,canWriteToFloatFBO){return(
md`
## Known issues
- Viscosity is a bit half-baked and not quite scale-independent
- Half floating point precision has some major precision issues which could be avoided with more careful arithmetic and scaling. ${
  !canWriteToFloatFBO
    ? `<em style="color:red">Warning: your device may support floating point textures but does not support writing to them. Half-floating point precision will be used instead, even though this computation has major precision issues with half-float precision.</em>`
    : ''
}`
)}

function _3(md){return(
md`Comments? Questions? [Let me know](https://twitter.com/rickyreusser/status/1189746847427907584).`
)}

function _canvas(shape)
{
  // Hold onto the canvas and resize it
  var canvas = this || document.createElement('canvas');
  canvas.width = shape.width;
  canvas.height = shape.height;
  return canvas;
}


function _restart(button){return(
button({ value: 'Restart' })
)}

function _run(checkbox){return(
checkbox({ options: ['Simulate'], value: 'Simulate' })
)}

function _view3d(checkbox){return(
checkbox({
  options: ['View potential in third dimension'],
  value: 'View potential in third dimension'
})
)}

function _particleTextureRadius(html)
{
  const form = html`<form>
    <input name=i type=range min=6 max=11 step=1 value=9>
    <output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;" name=o></output>
    <div style="font-size: 0.85rem; font-style: italic;">Particle count</div>
  </form>`;
  form.i.oninput = () => {
    var radius = Math.pow(2, form.i.valueAsNumber);
    var count = radius * radius;
    form.value = radius;
    form.o.value = `${count}`;
  };
  form.i.oninput();
  return form;
}


function _gridTextureRadius(html)
{
  const form = html`<form>
    <input name=i type=range min=2 max=10 step=1 value=8>
    <output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;" name=o></output>
    <div style="font-size: 0.85rem; font-style: italic;">Poisson solver grid resolution</div>
  </form>`;
  form.i.oninput = () => {
    var radius = Math.pow(2, form.i.valueAsNumber);
    form.value = radius;
    form.o.value = `${radius}`;
  };
  form.i.oninput();
  return form;
}


function _screenTextureRadius(html)
{
  const form = html`<form>
    <input name=i type=range min=8 max=11 step=1 value=9>
    <output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;" name=o></output>
    <div style="font-size: 0.85rem; font-style: italic;">Rasterization resolution</div>
  </form>`;
  form.i.oninput = () => {
    var radius = Math.round(Math.pow(2, form.i.valueAsNumber));
    form.value = radius;
    form.o.value = `${radius}`;
  };
  form.i.oninput();
  return form;
}


function _viscosity(slider){return(
slider({
  min: 0.0,
  max: 0.5,
  step: 0.01,
  value: 0.0,
  description: 'Viscosity (not a very strong effect)'
})
)}

function _decayTime(slider){return(
slider({
  min: 0.0,
  max: 0.5,
  step: 0.01,
  value: 0.0,
  description: 'Global velocity damping'
})
)}

function _alpha(slider){return(
slider({
  min: 0.0,
  max: 1,
  step: 0.01,
  value: 0.5,
  description: 'alpha'
})
)}

function _gamma(slider){return(
slider({
  min: 0.01,
  max: 3,
  step: 0.01,
  value: 2.2,
  description: 'gamma'
})
)}

function _dt(html)
{
  const form = html`<form>
    <input name=i type=range min=1 max=100 step=1 value=18>
    <output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;" name=o></output>
    <div style="font-size: 0.85rem; font-style: italic;">Time step, dt</div>
  </form>`;
  form.i.oninput = () => {
    form.value = form.i.valueAsNumber * 1e-4;
    form.o.value = `${form.value}`;
  };
  form.i.oninput();
  return form;
}


function _particleColor(color){return(
color({
  value: '#574ffe',
  name: 'color',
  description: 'Particle color'
})
)}

function _viscosityColor(color){return(
color({
  value: '#ff6650',
  name: 'color',
  description: 'Viscosity color'
})
)}

function _18(md){return(
md`## Frame output

Be careful here. It'll slam your browser with downloads, but if you _do_ take the plunge, my suggested command is:

\`\`\`
ffmpeg -r 30 -pattern_type glob -i "frame-*.png" -vcodec libx264 -crf 25  -pix_fmt yuv420p -crf 23 output.mp4
\`\`\`
`
)}

function _saveFrames(checkbox){return(
checkbox({
  options: ['Save frames'],
  description:
    'Warning! This starts downloading *lots* of files immediately. You should disable "ask to save each file" before checking this. Srsly. Be careful.'
})
)}

function _frameSaveIncrement(slider){return(
slider({
  min: 1,
  max: 100,
  step: 1,
  value: 5,
  description: 'frame save skip'
})
)}

function _21(md){return(
md`## Parameters`
)}

function _G(particleTextureRadius){return(
1 * Math.pow(512 / particleTextureRadius, 2)
)}

function _opacity(alpha,particleTextureRadius,screenTextureRadius){return(
Math.min(
  4,
  0.2 *
    alpha *
    Math.pow(512 / particleTextureRadius, 2) *
    Math.pow(screenTextureRadius / 512, 2)
)
)}

function _particleColorRGB(hexRgbToFloat,particleColor,gamma){return(
hexRgbToFloat(particleColor).map(c =>
    Math.pow(c, gamma)
  )
)}

function _viscosityColorRGB(hexRgbToFloat,viscosityColor,gamma){return(
hexRgbToFloat(viscosityColor).map(c =>
    Math.pow(c, gamma)
  )
)}

function _backgroundColorRGBA(view3d,gamma){return(
[0.04, 0.04, 0.04]
  .map(c => Math.pow(c, view3d ? 1.0 : gamma))
  .concat([1])
)}

function _27(md){return(
md`## WebGL setup

We perform all computation using the [regl](https://github.com/regl-project/regl) WebGL library.`
)}

function _dataType(select,canWriteToFloatFBO){return(
select({
  options: ['float', 'half float'],
  value: canWriteToFloatFBO ? 'float' : 'half float',
  title: 'Data type',
  description:
    'Framebuffer precision. Falls back to half float if floating point is not available, though the quality of results does suffer.'
})
)}

function _createREGL(require){return(
require('regl')
)}

function _regl(createREGL,canvas)
{
  // Hold onto the instance and resize it. If we change extensions,
  // we'll have to comment out `this ||` in order to reinstantiate.
  // This just prevents excessive context creation when the width
  // changes.
  var regl =
    this ||
    createREGL({
      extensions: [
        'OES_texture_float',
        'OES_texture_float_linear',
        'OES_element_index_uint',
        'OES_standard_derivatives'
      ],
      optionalExtensions: [
        'OES_texture_half_float',
        'OES_texture_half_float_linear'
      ],
      canvas: canvas,
      pixelRatio: devicePixelRatio,
      attributes: { antialias: true, preserveDrawingBuffer: true }
    });
  return regl;
}


function _configureUniforms(regl,gridTextureRadius){return(
regl({
  uniforms: {
    resolution: ctx => [ctx.viewportWidth, ctx.viewportHeight],
    dx: ctx => 1 / gridTextureRadius,
    dxInv: ctx => gridTextureRadius,
    dt: regl.prop('dt')
  }
})
)}

function _configureMap(regl){return(
regl({
  vert: `
    precision highp float;
    attribute vec2 aXY;
    varying vec2 vUV;
    void main () {
      vUV = aXY * 0.5 + 0.5;
      gl_Position = vec4(aXY, 0, 1);
    }
  `,
  attributes: {
    aXY: [-4, -4, 4, -4, 0, 4]
  },
  depth: { enable: false },
  primitive: 'triangle',
  count: 3
})
)}

function _configureCamera(regl){return(
regl({
  uniforms: {
    uProjectionView: regl.prop('projectionView')
  }
})
)}

function _blit(regl,screenTextureRadius){return(
regl({
  frag: `
    precision highp float;
    varying vec2 vUV;
    uniform float uGamma, uAspect;
    uniform sampler2D uSrc;
    uniform vec2 uScale;
    void main () {
      vec3 color = texture2D(uSrc, mod(0.5 + (vUV - 0.5) * uScale, vec2(1))).xyz;
      gl_FragColor = vec4(
        pow(color.r, uGamma),
        pow(color.g, uGamma),
        pow(color.b, uGamma),
      1);
    }`,
  uniforms: {
    uGamma: (ctx, props) => 1 / props.gamma,
    uSrc: regl.prop('src'),
    uAspect: ctx => ctx.framebufferWidth / ctx.framebufferHeight,
    uScale: ctx => [
      ctx.viewportWidth / screenTextureRadius,
      ctx.viewportHeight / screenTextureRadius
    ]
  }
})
)}

function _35(md){return(
md`## Iteration

We define our main iteration loop below.
`
)}

function _onFrame(restart,camera,run,configureUniforms,dt,densityFBO,regl,accumulateParticles,particleFBO,configureMap,performFFT,forwardFFT,phiFBO,computePotential,inverseFFT,integrate,viscosity,decayTime,swap,loopFBO,view3d,backgroundColorRGBA,drawParticlesToTexture,viscosityColorRGB,particleColorRGB,opacity,drawMesh,modelMatrices,gamma,blit,saveFrames,frameSaveIncrement,downloadURI,canvas,invalidation)
{
  restart;
  camera.taint();

  const onFrame = ({ tick }) => {
    if (run) {
      configureUniforms({ dt }, () => {
        // Step 1. Accumulate particles onto a texture
        densityFBO.use(() => {
          regl.clear({ color: [0, 0, 0, 1] });
          accumulateParticles({ src: particleFBO[0] });
        });

        configureMap(() => {
          // Step 2. Solve Poisson's equation for the potential
          performFFT(forwardFFT);
          phiFBO[1].use(() => computePotential({ src: phiFBO[0] }));
          performFFT(inverseFFT);

          // Step 3. Integrate in time
          particleFBO[1].use(() => {
            integrate({
              dt,
              viscosity,
              phi: phiFBO[0],
              src: particleFBO[0],
              density: densityFBO,
              globalDecay: decayTime
            });
          });

          swap(particleFBO, 0, 1);

          // Step 4. Rasterize the bodies onto a texture we'll loop and draw
          // to the screen
          loopFBO.use(() => {
            regl.clear({ color: view3d ? [0, 0, 0, 1] : backgroundColorRGBA });
            drawParticlesToTexture({
              src: particleFBO[0],
              density: densityFBO,
              viscosityColor: viscosityColorRGB,
              color: particleColorRGB,
              opacity,
              viscosity
            });
          });
        });
      });
    }

    // Step 5. either render a three dimensional view or just transfer
    // the loop framebuffer to the screen
    camera({ rotationCenter: camera.params.center }, state => {
      if (!run && !state.dirty) return;

      if (view3d) {
        regl.clear({ color: [0, 0, 0, 1], depth: 1 });
        drawMesh(
          modelMatrices.map(m => ({
            src: phiFBO[0],
            particleTexture: loopFBO,
            model: m,
            gamma: gamma
          }))
        );
      } else {
        configureMap(() => {
          blit({ src: loopFBO, gamma });
        });
      }
    });

    if (run) {
      if (saveFrames && tick % frameSaveIncrement === 0) {
        downloadURI(
          canvas.toDataURL(),
          `frame-${tick.toString().padStart(8, '0')}.png`
        );
      }
    }
  };

  const frame = regl.frame(onFrame);
  invalidation.then(frame.cancel);
}


function _initialize(restart,particleFBO,transferAttrToTexture,initialParticleStateBuffer,camera)
{
  // Trigger reinitialization when 'restart' is clicked
  restart;

  particleFBO.forEach(fbo =>
    transferAttrToTexture({
      src: initialParticleStateBuffer,
      dst: fbo
    })
  );

  camera.taint();
}


function _38(md){return(
md`## Initialization`
)}

function _pdf(){return(
function pdf(x, y) {
  // PDF used for sampling initial positions. x and y in [0, 1], and returned value is in [0, 1].
  return 1.0;

  // Lots of little bumps:
  //return 0.9 + 0.1 * Math.cos(x * Math.PI * 16) * Math.sin(y * Math.PI * 16);

  // Circular blob:
  //var r2 = x * x + y * y;
  //if (r2 > 0.2) return 0;
  //return Math.exp(-r2 / Math.pow(0.3, 2));
}
)}

function _initialVelocity(){return(
function initialVelocity(out, x, y) {
  out[0] = 0;
  out[1] = 0;
  return;

  /*return [
    0.0 * -Math.cos(x * Math.PI * 16) * Math.cos(y * Math.PI * 16),
    0.0 * Math.sin(x * Math.PI * 16) * Math.sin(y * Math.PI * 16)
  ];*/

  // Roughly circular orbit speed:
  //var r = Math.sqrt(x * x + y * y);
  //var speed =
  //  (4.5 - 3.5 * r + 0.5 * r * (1 - r)) * Math.pow(512 / gridTextureRadius, 1);
  //out[0] = y * speed;
  //out[1] = -x * speed;
}
)}

function _initialParticleState(particleTextureRadius,pdf,initialVelocity)
{
  var v = [0, 0];
  var xn, yn;
  var n = particleTextureRadius * particleTextureRadius;
  var data = new Float32Array(n * 4);
  for (var i = 0, i4 = 0; i < n; i++, i4 += 4) {
    var acceptable = false;
    while (!acceptable) {
      var x = Math.random();
      var y = Math.random();
      xn = x * 2 - 1;
      yn = y * 2 - 1;
      acceptable = Math.random() < pdf(xn, yn);
    }
    data[i4] = x;
    data[i4 + 1] = y;

    // Initial velocity
    initialVelocity(v, xn, yn);
    data[i4 + 2] = v[0];
    data[i4 + 3] = v[1];
  }
  return data;
}


function _initialParticleStateBuffer(regl,initialParticleState){return(
regl.buffer(initialParticleState)
)}

function _transferAttrToTexture(regl,particleTextureLookup,particleTextureRadius){return(
regl({
  vert: `
    precision highp float;
    attribute vec2 aXY;
    attribute vec4 aSrc;
    varying vec4 vSrc;
    void main () {
      vSrc = aSrc;
      gl_Position = vec4(2.0 * aXY - 1.0, 0, 1);
      gl_PointSize = 1.0;
    }`,
  frag: `
    precision highp float;
    varying vec4 vSrc;
    void main () {
      gl_FragColor = vSrc;
    }`,
  attributes: {
    aXY: particleTextureLookup,
    aSrc: regl.prop('src')
  },
  depth: { enable: false },
  framebuffer: regl.prop('dst'),
  primitive: 'points',
  count: particleTextureRadius * particleTextureRadius
})
)}

function _44(md,tex,gridTextureRadius){return(
md`## Accumulate particles

The first step is to accumulate the particle density onto a texture. We rasterize all bodies as a single-pixel point onto a ${tex`${gridTextureRadius} \times ${gridTextureRadius}`} texture.`
)}

function _densityFBO(regl,gridTextureRadius,dataType){return(
(this || regl.framebuffer)({
  color: regl.texture({
    radius: gridTextureRadius,
    wrapS: 'repeat',
    wrapT: 'repeat',
    mag: 'linear',
    min: 'linear',
    type: dataType
  })
})
)}

function _accumulateParticles(regl,particleTextureLookup,particleTextureRadius){return(
regl({
  vert: `
    precision highp float;
    attribute vec2 aXY;
    varying vec2 vVelocity;
    uniform sampler2D uSrc;
    void main () {
      vec4 state = texture2D(uSrc, aXY);
      vVelocity = state.zw;
      gl_Position = vec4(state.xy * 2.0 - 1.0, 0, 1);
      gl_PointSize = 1.0;
    }
  `,
  frag: `
    precision highp float;
    varying vec2 vVelocity;
    void main () {
      // We accumulate mass = 1 for each particle into the x channel,
      // but we also accumulate the velocity into the last two channels.
      // This will allow us to compute an average velocity in each cell
      // in order to apply a sort of viscosity which pulls each point in
      // the cell toward the average velocity of its neighbors.
      gl_FragColor = vec4(vVelocity, 1, 0);
    }`,
  attributes: {
    aXY: particleTextureLookup
  },
  uniforms: {
    uSrc: regl.prop('src')
  },
  blend: {
    enable: true,
    func: { srcRGB: 1, srcAlpha: 1, dstRGB: 1, dstAlpha: 1 }
  },
  depth: { enable: false },
  count: particleTextureRadius * particleTextureRadius,
  primitive: 'points'
})
)}

function _particleTextureLookup(createTextureLookupTable,particleTextureRadius){return(
createTextureLookupTable(
  particleTextureRadius,
  particleTextureRadius
)
)}

function _48(md,tex){return(
md`## Poisson's equation for the gravitational potential

This is the step which perhaps requires the most explanation. Given the density ${tex`\rho`} computed when we accumulate particles above, the equation we seek to solve for the potential ${tex`\phi`} in ${tex.block`\nabla^2 \phi = 4 \pi G \rho.`}

A commonly used strategy for solving [Poisson's equation](https://en.wikipedia.org/wiki/Poisson%27s_equation) is [Jacobi iteration](https://en.wikipedia.org/wiki/Jacobi_method), which you can think of roughly like repeatedly averaging grid points with their neighbors with addition of the source term ${tex`4 \pi G \rho`}. It's like a blurring or diffusion process, but since there's no time component to this equation, we have to iterate until we reach steady state. The process is excruciatingly slow! Since Newtonian gravity travels instantaneously, it's rather annoying to use a numerical method that travels one grid cell per iteration. Convergence typically takes hundreds or thousands of iterations.

The _ideal_ technique is a [multigrid method](https://en.wikipedia.org/wiki/Multigrid_method) which (remarkably) requires ${tex`O(n)`} operations, where n is the number of grid cells. There's lots of bookkeeping involved though, so in this notebook we'll use the [Fast Fourier Transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform) to solve Poisson's equation in the frequency domain. This method is almost as good, requiring ${tex`O(n \log n)`} iterations.

Solving Poisson's equation in the frequency domain requires a bit of reorganization—in addition to the tricks it requires to solve it in WebGL! We start by representing the per-grid-cell density we've computed in terms of frequency components. You can think each frequency component as ripples in a given direction, similar to [JPEG components](https://en.wikipedia.org/wiki/JPEG#Encoding) if you're familiar with that. Each component is just a sine wave pointing some direction in two dimensions. We talk about them in terms of wavenumbers ${tex`k`} which are related to wavelength ${tex`\lambda`} as ${tex`k = \frac{2\pi}{\lambda}`}.

Omitting some uninteresting details of integration, we consider only a single frequency component at a time and substitute for gravitational potential ${tex`\phi`} and density ${tex`\rho`} ${tex.block`\begin{aligned}
\rho &= \hat{\rho} e^{i(k_x x + k_y y)} \\
\phi &= \hat{\phi} e^{i(k_x x + k_y y)}
\end{aligned}`}
where ${tex`k_x`} and ${tex`k_y`} are x and y wavenumbers. You can think of ${tex`\hat{\phi}`} and ${tex`\hat{\rho}`} as complex numbers representing how much of each frequency component we have.

At last we can do some math! We write the [Laplacian operator](https://en.wikipedia.org/wiki/Laplace_operator) ${tex`\nabla^2`} as ${tex.block`\nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2}.`} Then we have for our equation ${tex.block`\begin{aligned}
\nabla^2 \left(\hat{\phi} e^{i(k_x x + k_y y)}\right) &= -(k_x^2 + k_y^2)\hat{\phi}e^{i(k_x x + k_y y)} \\
&= 4 \pi G \hat{\rho} e^{i(k_x x + k_y y)}
\end{aligned}`} Note that ${tex`\hat{\phi}`} and ${tex`\hat{\rho}`} are unaffected by the partial derivatives since they're constant complex numbers for a given wavenumber component. We cancel the complex exponential and write ${tex.block`-(k_x^2 + k_y^2)\hat{\phi} = 4 \pi G \hat{\rho},`} finally dividing through by the wavenumbers to write ${tex.block`\hat{\phi} = -\frac{4 \pi G \hat{\rho}}{k_x^2 + k_y^2}.`} If we started with the Fourier transform of the density, this is our answer as a Fourier transform of the potential. Once we've computed the the gravitational potential ${tex`\hat{\phi}`} in the frequency domain, we perform the inverse Fast Fourier Transform and obtain the potential ${tex`\phi`}.

There's just one additional step. The gravitational potential is nice for visualizing potential wells, but for updating the particle positions we require its gradient ${tex.block`\mathbf{g} = -\nabla \phi,`}where ${tex`\mathbf{g}`} is the acceleration of a body due to gravity. We compute this similarly, writing the gradient as ${tex.block`\nabla \phi = \mathbf{i} \frac{\partial \phi}{\partial x} + \mathbf{j} \frac{\partial \phi}{\partial y}.`} Considering the components one at a time, we have in the frequency domain for the x-component of the gradient ${tex.block`\frac{\partial}{\partial x}\left(\hat{\phi} e^{i(k_x x + k_y y)}\right) = i k_x \hat{\phi}e^{i(k_x x + k_y y)}`} Cancelling the exponentials, we're left with ${tex.block`\frac{\partial \hat{\phi}}{\partial x} = i k_x \hat{\phi}.`} Simiarly for the y-component, ${tex.block`\frac{\partial \hat{\phi}}{\partial y} = i k_y \hat{\phi}.`} To make a long story short, differentiation in the spatial domain is equivalent to multiplication by wavenumber and a phase shift in the frequency domain. Once we've computed ${tex`\hat{\phi}`}, we can directly compute the force on a given body!

The actual computation of this gradient is where things get fun. Since we perform all of this computation using WebGL textures, we have four channels to work with, which for complex numbers ${tex`a`} and ${tex`b`} is encoded in RGBA as ${tex`(\mathrm{Re}(a), \mathrm{Im}(a), \mathrm{Re}(b), \mathrm{Im}(b))`}. Instead of four real numbers, we'll write this as a tuple of two complex numbers, ${tex`(a, b)`}.

Our input is the density in the spatial comain, ${tex`(\rho, 0)`}. Once Fourier transformed, we have its frequency-domain representation, ${tex`(\hat{\rho}, 0)`}.

We then compute the Fourier transform of the potential ${tex`\hat{\phi}`} via our equation ${tex`\hat{\phi} = -\frac{4 \pi G }{k_x^2 + k_y^2}\hat{\rho}`} and place this result in the first two components, yielding ${tex`(\hat{\phi}, 0)`}.

The last two channels are left empty, so we use them during the inverse Fourier transform to compute the gradient of the potential! If we hope to retrieve them in the last two of four channels, then we seek the sum ${tex.block`\frac{\partial \phi}{\partial x} + i \frac{\partial \phi}{\partial y}`} which we write in the frequency domain as ${tex.block`i k_x \hat{\phi} + i (i k_y \hat{\phi}),`} or ${tex.block`i k_x \hat{\phi} - k_y \hat{\phi}.`} Thus our final value before inverse Fourier transforming is the tuple of two complex numbers, ${tex.block`(\hat{\phi}, i k_x \hat{\phi} - k_y \hat{\phi}).`} After inverse Fourier transforming, we recover our result, ${tex.block`\left(\phi, \frac{\partial \phi}{\partial x} + i\frac{\partial \phi}{\partial y}\right).`} If we break this tuple of two complex numbers into its four components as are stored in the texture, then we write this as ${tex.block`\left(\phi, 0, \frac{\partial \phi}{\partial x}, \frac{\partial \phi}{\partial y}\right)`}
We plot the gravitational potential ${tex`\phi`} as a height field and sample the gradient with linear interpolation to compute the force acting on each body.
`
)}

function _phiFBO(regl,gridTextureRadius,dataType){return(
[0, 1, 2, 3].map(i =>
  regl.framebuffer({
    color: regl.texture({
      radius: gridTextureRadius,
      wrapS: 'repeat',
      wrapT: 'repeat',
      mag: i === 0 ? 'linear' : 'nearest',
      min: i === 0 ? 'linear' : 'nearest',
      type: dataType
    })
  })
)
)}

function _performFFT(createFFTPassCommand,regl){return(
createFFTPassCommand(regl)
)}

function _forwardFFT(planFFT,gridTextureRadius,densityFBO,phiFBO){return(
planFFT({
  width: gridTextureRadius,
  height: gridTextureRadius,
  input: densityFBO,
  ping: phiFBO[2],
  pong: phiFBO[3],
  output: phiFBO[0],
  forward: true
})
)}

function _inverseFFT(planFFT,gridTextureRadius,phiFBO){return(
planFFT({
  width: gridTextureRadius,
  height: gridTextureRadius,
  input: phiFBO[1],
  ping: phiFBO[2],
  pong: phiFBO[3],
  output: phiFBO[0],
  forward: false
})
)}

function _computePotential(regl,glslWavenumber,forwardFFT,G){return(
regl({
  frag: `
    precision highp float;
    varying vec2 vUV;
    uniform sampler2D uSrc;
    uniform vec2 uResolution;
    uniform float dx, uCoeff;

    ${glslWavenumber}
     
    void main () {
      vec2 yfft = texture2D(uSrc, vUV).zw;

      vec2 k = wavenumber(uResolution, vec2(dx));
      float kx2ky2 = dot(k, k);
 
      // Ensure we don't divide by zero:
      if (kx2ky2 < 1.0e-8) kx2ky2 = 1.0;

      vec2 phifft = uCoeff / kx2ky2 * yfft;

      vec2 dphidx = vec2(-k.x, k.x) * phifft.yx;
      vec2 dphidy = vec2(-k.y, k.y) * phifft.yx;
      vec2 gradient = dphidx + vec2(-dphidy.y, dphidy.x);

      gl_FragColor = vec4(phifft, gradient);
    }
  `,
  uniforms: {
    uSrc: regl.prop('src'),
    uResolution: forwardFFT[0].resolution,
    uCoeff: -4.0 * Math.PI * G
  }
})
)}

function _54(md){return(
md`## Time integration

Integration in time is straightforward. We use second order midpoint integration, though we fudge it a little and don't fully recompute the potential between the two steps (because that'd be very expensive!).`
)}

function _particleFBO(regl,particleTextureRadius,dataType){return(
[0, 1].map(() => {
  return regl.framebuffer({
    color: regl.texture({
      radius: particleTextureRadius,
      mag: 'nearest',
      min: 'nearest',
      type: dataType
    })
  });
})
)}

function _integrate(regl){return(
regl({
  frag: `
    precision highp float;

    varying vec2 vUV;
    uniform sampler2D uSrc, uDensity, uPhi;
    uniform float dx, dxInv, dt, uGlobalDecay, uViscosity;

    vec4 deriv (vec4 y) {
      vec2 phiGradient = texture2D(uPhi, y.xy).zw;
      vec4 dydt = vec4(y.zw, phiGradient);

      // This step is a bit half-baked. I intended to compute the average
      // nearby velocity and move particles toward it, but it just doesn't
      // seem to have quite the dramatic effect I hoped
      vec3 density = texture2D(uDensity, y.xy).zxy;
      //vec3 densityN = texture2D(uDensity, y.xy + vec2(0, dx)).xzw;
      //vec3 densityS = texture2D(uDensity, y.xy - vec2(0, dx)).xzw;
      //vec3 densityE = texture2D(uDensity, y.xy + vec2(dx, 0)).xzw;
      //vec3 densityW = texture2D(uDensity, y.xy - vec2(dx, 0)).xzw;
      //vec3 avgDensity = 0.5 * density + 0.125 * (densityN + densityS + densityE + densityW);
      vec3 avgDensity = density;

      vec2 vMean = avgDensity.yz / max(avgDensity.x, 1.0);
      vec2 vdiff = vMean - y.zw;
      dydt.zw += vdiff * (1.0 - exp(-avgDensity.x * uViscosity));

      dydt.zw -= uGlobalDecay * y.zw;
      return dydt;
    }

    void main () {
      vec4 y = texture2D(uSrc, vUV);

      // Midpoint integration

      // Predict:
      vec4 yHalf = y + deriv(y) * dt * 0.5;
      yHalf.xy = mod(yHalf.xy, vec2(1, 1));

      // Correct:
      vec4 yNext = y + deriv(yHalf) * dt;
      yNext.xy = mod(yNext.xy, vec2(1, 1));

      gl_FragColor = yNext;
    }`,
  uniforms: {
    uSrc: regl.prop('src'),
    uDensity: regl.prop('density'),
    uPhi: regl.prop('phi'),
    uViscosity: regl.prop('viscosity'),
    uGlobalDecay: regl.prop('globalDecay')
  }
})
)}

function _57(md){return(
md`## Output`
)}

function _loopFBO(regl,screenTextureRadius,dataType){return(
(this || regl.framebuffer)({
  color: regl.texture({
    radius: screenTextureRadius,
    type: dataType,
    min: 'linear',
    mag: 'linear',
    wrapS: 'repeat',
    wrapT: 'repeat'
  })
})
)}

function _drawParticlesToTexture(regl,particleTextureLookup,gridTextureRadius,particleTextureRadius){return(
regl({
  vert: `
    precision highp float;
    attribute vec2 aXY;
    varying vec2 vVelocity;
    varying float vFriction;
    uniform float uViscosity, uViscosityOpacity;
    uniform sampler2D uSrc, uDensity;
    void main () {
      vec4 state = texture2D(uSrc, aXY);
      vec3 density = texture2D(uDensity, state.xy).zxy;

      vec2 vavg = density.yz / max(density.x, 1.0);
      vec2 dv = state.zw - vavg;
      vFriction = pow(length(dv), 2.0) * 0.2 * uViscosityOpacity;

      gl_Position = vec4(state.xy * 2.0 - 1.0, 0, 1);
      gl_PointSize = 1.0;
    }
  `,
  frag: `
    precision highp float;
    uniform float uAlpha;
    uniform vec3 uColor, uViscosityColor;
    varying float vFriction;
    void main () {
      gl_FragColor = vec4((uColor + vFriction * uViscosityColor) * uAlpha, 1.0);
    }`,
  attributes: {
    aXY: particleTextureLookup
  },
  uniforms: {
    uViscosity: regl.prop('viscosity'),
    uViscosityColor: regl.prop('viscosityColor'),
    uColor: regl.prop('color'),
    uSrc: regl.prop('src'),
    uDensity: regl.prop('density'),
    uAlpha: regl.prop('opacity'),
    uViscosityOpacity: () => Math.pow(gridTextureRadius / 256, 2)
  },
  blend: {
    enable: true,
    func: { srcRGB: 1, srcAlpha: 1, dstRGB: 1, dstAlpha: 1 }
  },
  depth: { enable: false },
  count: particleTextureRadius * particleTextureRadius,
  primitive: 'points'
})
)}

function _camera(createReglCamera,regl,createInteractions)
{
  var camera = createReglCamera(regl, {
    phi: 0.4,
    distance: 4,
    center: [0, -1, 0]
  });
  createInteractions(camera);
  return camera;
}


function _drawMesh(gridTextureRadius,regl)
{
  function createTextureLookupTable(w, h, stride) {
    stride = stride || 2;
    var n = w * h * stride;
    var out = new Float32Array(n);
    for (var i = 0, iStride = 0; iStride < n; i++, iStride += stride) {
      out[iStride] = ((i % w) + 0.5) / (w - 1);
      out[iStride + 1] = (((i / w) | 0) + 0.5) / (h - 1);
    }
    return out;
  }

  var meshElements = [];
  var n = gridTextureRadius + 1;
  for (var j = 0; j < n - 1; j++) {
    for (var i = 0; i < n - 1; i++) {
      meshElements.push(
        [i + n * j, i + 1 + n * j, i + 1 + n * (j + 1)],
        [i + n * j, i + 1 + n * (j + 1), i + n * (j + 1)]
      );
    }
  }

  return regl({
    vert: `
    precision highp float;
    attribute vec2 aXY;
    uniform mat4 uProjectionView, uModel;
    uniform float uVerticalScale;
    uniform sampler2D uSrc;
    varying vec3 vXYZ;
    varying vec2 vUV;
    varying float r, vY;
    void main () {
      vY = texture2D(uSrc, aXY).x;
      vUV = aXY;
      float yMean = 0.25 * (
        texture2D(uSrc, vec2(0.25, 0.25)).x +
        texture2D(uSrc, vec2(0.25, 0.75)).x +
        texture2D(uSrc, vec2(0.75, 0.25)).x +
        texture2D(uSrc, vec2(0.75, 0.75)).x
      );
      vY -= yMean;
      vY *= uVerticalScale;
      vXYZ = vec3(aXY.x, vY * 0.03, aXY.y);
      vec4 pos = uModel * vec4(vXYZ * 2.0 - 1.0, 1);
      r = length(pos.xz);
      gl_Position = uProjectionView * pos;
    }`,
    frag: `
    #extension GL_OES_standard_derivatives : enable
    precision highp float;

    uniform sampler2D uParticleTex;

    float gridFactor (float parameter, float width, float feather) {
      float w1 = width - feather * 0.5;
      float d = fwidth(parameter);
      float looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
      return smoothstep(d * w1, d * (w1 + feather), looped);
    }

    float gridFactor (vec2 parameter, float width, float feather) {
      float w1 = width - feather * 0.5;
      vec2 d = fwidth(parameter);
      vec2 looped = 0.5 - abs(mod(parameter, 1.0) - 0.5);
      vec2 a2 = smoothstep(d * w1, d * (w1 + feather), looped);
      return min(a2.x, a2.y);
    }

    varying vec3 vXYZ;
    varying vec2 vUV;
    varying float r, vY;
    uniform float uGamma;
    void main () {
      vec3 particle = texture2D(uParticleTex, vUV).rgb;

      particle.r = pow(particle.r, uGamma);
      particle.g = pow(particle.g, uGamma);
      particle.b = pow(particle.b, uGamma);

      gl_FragColor = vec4(smoothstep(3.0, 1.5, r) * (
        vec3(
          0.10 + 
          0.10 * (1.0 - gridFactor(vXYZ.xz * 4.0, 0.5, 1.0)) + 
          0.07 * (1.0 - gridFactor(vXYZ.xz * 40.0, 0.5, 1.0)) +
          0.85 * vec3(smoothstep(2.0, -40.0, vY))
        ) + 0.6 * particle),
        1);
    }`,
    attributes: {
      aXY: createTextureLookupTable(n, n)
    },
    uniforms: {
      uVerticalScale: Math.pow(gridTextureRadius / 256, 2),
      uSrc: regl.prop('src'),
      uParticleTex: regl.prop('particleTexture'),
      uModel: regl.prop('model'),
      uGamma: (ctx, props) => 1 / props.gamma
    },
    depth: { enable: true },
    primitive: 'triangles',
    elements: meshElements
  });
}


function _62(md){return(
md`*TO DO*: instanced rendering instead of multiple draw calls with a different model matrix.`
)}

function _modelMatrices(mat4fromTranslation,mat4create){return(
[
  [-2, 0, -2],
  [-2, 0, 0],
  [-2, 0, 2],
  [0, 0, -2],
  [0, 0, 0],
  [0, 0, 2],
  [2, 0, -2],
  [2, 0, 0],
  [2, 0, 2]
].map(v => mat4fromTranslation(mat4create(), v))
)}

function _64(md){return(
md`## Miscellaneous imports`
)}

function _swap(){return(
function swap(obj, key1, key2) {
  key1 = key1 === undefined ? 0 : key1;
  key2 = key2 === undefined ? 1 : key2;
  var tmp = obj[key1];
  obj[key1] = obj[key2];
  obj[key2] = tmp;
}
)}

function _canWriteToFloatFBO(canWriteToFBOOfType,regl){return(
canWriteToFBOOfType(regl, 'float')
)}

function _shape(width)
{
  //return { width: 800, height: 600 };
  var w = width;

  return {
    width: 2 * Math.floor(w / 2),
    height: Math.max(360, 2 * Math.floor(Math.floor((w * 3) / 4) / 2))
  };
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","particleTextureRadius","tex","gridTextureRadius"], _1);
  main.variable(observer()).define(["md","canWriteToFloatFBO"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("canvas")).define("canvas", ["shape"], _canvas);
  main.variable(observer("viewof restart")).define("viewof restart", ["button"], _restart);
  main.variable(observer("restart")).define("restart", ["Generators", "viewof restart"], (G, _) => G.input(_));
  main.variable(observer("viewof run")).define("viewof run", ["checkbox"], _run);
  main.variable(observer("run")).define("run", ["Generators", "viewof run"], (G, _) => G.input(_));
  main.variable(observer("viewof view3d")).define("viewof view3d", ["checkbox"], _view3d);
  main.variable(observer("view3d")).define("view3d", ["Generators", "viewof view3d"], (G, _) => G.input(_));
  main.variable(observer("viewof particleTextureRadius")).define("viewof particleTextureRadius", ["html"], _particleTextureRadius);
  main.variable(observer("particleTextureRadius")).define("particleTextureRadius", ["Generators", "viewof particleTextureRadius"], (G, _) => G.input(_));
  main.variable(observer("viewof gridTextureRadius")).define("viewof gridTextureRadius", ["html"], _gridTextureRadius);
  main.variable(observer("gridTextureRadius")).define("gridTextureRadius", ["Generators", "viewof gridTextureRadius"], (G, _) => G.input(_));
  main.variable(observer("viewof screenTextureRadius")).define("viewof screenTextureRadius", ["html"], _screenTextureRadius);
  main.variable(observer("screenTextureRadius")).define("screenTextureRadius", ["Generators", "viewof screenTextureRadius"], (G, _) => G.input(_));
  main.variable(observer("viewof viscosity")).define("viewof viscosity", ["slider"], _viscosity);
  main.variable(observer("viscosity")).define("viscosity", ["Generators", "viewof viscosity"], (G, _) => G.input(_));
  main.variable(observer("viewof decayTime")).define("viewof decayTime", ["slider"], _decayTime);
  main.variable(observer("decayTime")).define("decayTime", ["Generators", "viewof decayTime"], (G, _) => G.input(_));
  main.variable(observer("viewof alpha")).define("viewof alpha", ["slider"], _alpha);
  main.variable(observer("alpha")).define("alpha", ["Generators", "viewof alpha"], (G, _) => G.input(_));
  main.variable(observer("viewof gamma")).define("viewof gamma", ["slider"], _gamma);
  main.variable(observer("gamma")).define("gamma", ["Generators", "viewof gamma"], (G, _) => G.input(_));
  main.variable(observer("viewof dt")).define("viewof dt", ["html"], _dt);
  main.variable(observer("dt")).define("dt", ["Generators", "viewof dt"], (G, _) => G.input(_));
  main.variable(observer("viewof particleColor")).define("viewof particleColor", ["color"], _particleColor);
  main.variable(observer("particleColor")).define("particleColor", ["Generators", "viewof particleColor"], (G, _) => G.input(_));
  main.variable(observer("viewof viscosityColor")).define("viewof viscosityColor", ["color"], _viscosityColor);
  main.variable(observer("viscosityColor")).define("viscosityColor", ["Generators", "viewof viscosityColor"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof saveFrames")).define("viewof saveFrames", ["checkbox"], _saveFrames);
  main.variable(observer("saveFrames")).define("saveFrames", ["Generators", "viewof saveFrames"], (G, _) => G.input(_));
  main.variable(observer("viewof frameSaveIncrement")).define("viewof frameSaveIncrement", ["slider"], _frameSaveIncrement);
  main.variable(observer("frameSaveIncrement")).define("frameSaveIncrement", ["Generators", "viewof frameSaveIncrement"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("G")).define("G", ["particleTextureRadius"], _G);
  main.variable(observer("opacity")).define("opacity", ["alpha","particleTextureRadius","screenTextureRadius"], _opacity);
  main.variable(observer("particleColorRGB")).define("particleColorRGB", ["hexRgbToFloat","particleColor","gamma"], _particleColorRGB);
  main.variable(observer("viscosityColorRGB")).define("viscosityColorRGB", ["hexRgbToFloat","viscosityColor","gamma"], _viscosityColorRGB);
  main.variable(observer("backgroundColorRGBA")).define("backgroundColorRGBA", ["view3d","gamma"], _backgroundColorRGBA);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("viewof dataType")).define("viewof dataType", ["select","canWriteToFloatFBO"], _dataType);
  main.variable(observer("dataType")).define("dataType", ["Generators", "viewof dataType"], (G, _) => G.input(_));
  main.variable(observer("createREGL")).define("createREGL", ["require"], _createREGL);
  main.variable(observer("regl")).define("regl", ["createREGL","canvas"], _regl);
  main.variable(observer("configureUniforms")).define("configureUniforms", ["regl","gridTextureRadius"], _configureUniforms);
  main.variable(observer("configureMap")).define("configureMap", ["regl"], _configureMap);
  main.variable(observer("configureCamera")).define("configureCamera", ["regl"], _configureCamera);
  main.variable(observer("blit")).define("blit", ["regl","screenTextureRadius"], _blit);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer("onFrame")).define("onFrame", ["restart","camera","run","configureUniforms","dt","densityFBO","regl","accumulateParticles","particleFBO","configureMap","performFFT","forwardFFT","phiFBO","computePotential","inverseFFT","integrate","viscosity","decayTime","swap","loopFBO","view3d","backgroundColorRGBA","drawParticlesToTexture","viscosityColorRGB","particleColorRGB","opacity","drawMesh","modelMatrices","gamma","blit","saveFrames","frameSaveIncrement","downloadURI","canvas","invalidation"], _onFrame);
  main.variable(observer("initialize")).define("initialize", ["restart","particleFBO","transferAttrToTexture","initialParticleStateBuffer","camera"], _initialize);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer("pdf")).define("pdf", _pdf);
  main.variable(observer("initialVelocity")).define("initialVelocity", _initialVelocity);
  main.variable(observer("initialParticleState")).define("initialParticleState", ["particleTextureRadius","pdf","initialVelocity"], _initialParticleState);
  main.variable(observer("initialParticleStateBuffer")).define("initialParticleStateBuffer", ["regl","initialParticleState"], _initialParticleStateBuffer);
  main.variable(observer("transferAttrToTexture")).define("transferAttrToTexture", ["regl","particleTextureLookup","particleTextureRadius"], _transferAttrToTexture);
  main.variable(observer()).define(["md","tex","gridTextureRadius"], _44);
  main.variable(observer("densityFBO")).define("densityFBO", ["regl","gridTextureRadius","dataType"], _densityFBO);
  main.variable(observer("accumulateParticles")).define("accumulateParticles", ["regl","particleTextureLookup","particleTextureRadius"], _accumulateParticles);
  main.variable(observer("particleTextureLookup")).define("particleTextureLookup", ["createTextureLookupTable","particleTextureRadius"], _particleTextureLookup);
  main.variable(observer()).define(["md","tex"], _48);
  main.variable(observer("phiFBO")).define("phiFBO", ["regl","gridTextureRadius","dataType"], _phiFBO);
  main.variable(observer("performFFT")).define("performFFT", ["createFFTPassCommand","regl"], _performFFT);
  main.variable(observer("forwardFFT")).define("forwardFFT", ["planFFT","gridTextureRadius","densityFBO","phiFBO"], _forwardFFT);
  main.variable(observer("inverseFFT")).define("inverseFFT", ["planFFT","gridTextureRadius","phiFBO"], _inverseFFT);
  main.variable(observer("computePotential")).define("computePotential", ["regl","glslWavenumber","forwardFFT","G"], _computePotential);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer("particleFBO")).define("particleFBO", ["regl","particleTextureRadius","dataType"], _particleFBO);
  main.variable(observer("integrate")).define("integrate", ["regl"], _integrate);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer("loopFBO")).define("loopFBO", ["regl","screenTextureRadius","dataType"], _loopFBO);
  main.variable(observer("drawParticlesToTexture")).define("drawParticlesToTexture", ["regl","particleTextureLookup","gridTextureRadius","particleTextureRadius"], _drawParticlesToTexture);
  main.variable(observer("camera")).define("camera", ["createReglCamera","regl","createInteractions"], _camera);
  main.variable(observer("drawMesh")).define("drawMesh", ["gridTextureRadius","regl"], _drawMesh);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer("modelMatrices")).define("modelMatrices", ["mat4fromTranslation","mat4create"], _modelMatrices);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer("swap")).define("swap", _swap);
  const child1 = runtime.module(define1);
  main.import("mat4perspective", child1);
  main.import("mat4create", child1);
  main.import("mat4lookAt", child1);
  main.import("mat4multiply", child1);
  main.import("mat4fromTranslation", child1);
  const child2 = runtime.module(define2);
  main.import("createReglCamera", child2);
  main.import("createInteractions", child2);
  const child3 = runtime.module(define3);
  main.import("hexRgbToFloat", child3);
  main.import("downloadURI", child3);
  const child4 = runtime.module(define2);
  main.import("createTextureLookupTable", child4);
  main.import("canWriteToFBOOfType", child4);
  const child5 = runtime.module(define4);
  main.import("checkbox", child5);
  main.import("button", child5);
  main.import("slider", child5);
  main.import("color", child5);
  main.import("select", child5);
  const child6 = runtime.module(define5);
  main.import("planFFT", child6);
  main.import("createFFTPassCommand", child6);
  main.import("glslWavenumber", child6);
  main.variable(observer("canWriteToFloatFBO")).define("canWriteToFloatFBO", ["canWriteToFBOOfType","regl"], _canWriteToFloatFBO);
  main.variable(observer("shape")).define("shape", ["width"], _shape);
  return main;
}
