import define1 from "./9bb66f83088d768e@1833.js";
import define2 from "./17428bc970543296@1461.js";
import define3 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# Animation curves with Three.js`
)}

function _2(md){return(
md `Quickly animating a bouncy cube with the [curve editor from Nhogs](https://observablehq.com/@nhogs/easing-graphs-editor).


The movement is inspired by [Unity's example](https://docs.unity3d.com/Manual/animeditor-AnimationCurves.html) and uses 4 easing curves under the webgl container. 
`
)}

function _3(THREE,camera,renderer,invalidation,width,height,scene)
{
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  invalidation.then(() => (controls.dispose(), renderer.dispose()));
  renderer.setSize(width, height);
  renderer.setPixelRatio(devicePixelRatio);
  controls.addEventListener("change", () => renderer.render(scene, camera));
  renderer.render(scene, camera);
  return renderer.domElement;
}


function _wireframe(checkbox){return(
checkbox({
  description: "Toggle wireframes",
  options: [{ value: "On", label: "On" }],
  value: "On"
})
)}

function _customInterpolator(colorInterpolatorPicker){return(
colorInterpolatorPicker({
  title: "Cube color",
  height: 500,
  value: "YlOrRd",
  interpolators: [
    {
      name: "BuGn"
    },
    {
      name: "BuPu"
    },
    {
      name: "GnBu"
    },
    {
      name: "OrRd"
    },
    {
      name: "PuBuGn"
    },
    {
      name: "PuBu"
    },
    {
      name: "PuRd"
    },
    {
      name: "RdPu"
    },
    {
      name: "YlGnBu"
    },
    {
      name: "YlGn"
    },
    {
      name: "YlOrBr"
    },
    {
      name: "YlOrRd"
    }
  ]
})
)}

function _animationDuration(number){return(
number({title: "Animation duration", value:1000})
)}

function _translationAmount(number){return(
number({title: "Translation amount (y)", value:3})
)}

function _scaleAmount(number){return(
number({title: "Scale amount (y)", value:2})
)}

function _rotationAmount(number){return(
number({title: "Rotation amount (y)", value:3})
)}

function _10(md,animationDuration){return(
md `---

# Easing curves

Here we animate the cube's scaling (y), translation (y), rotation (y) and emission color.
To do this, we use the 4 animation curves below, computing the values between 0 and 1 from a  ${animationDuration/1000} seconds sample.


They each have a default value, try to change them to see how it affects everything. I suggest using "slow motion" with an animation duration of at least 5 seconds.

---`
)}

function _scaling(chartEditor,Curve,Keyframe){return(
chartEditor({ 
  title:'Y scaling',
  easePreview: false,  
  boundFirstLast: false, 
  defaultCurve: 
  
 new Curve([new Keyframe({"time":0,"value":0.1,"inTangent":0,"outTangent":0,"id":"O-16","inMagnitude":-0.1,"outMagnitude":0.1}),new Keyframe({"time":0.2033898305084746,"value":0.8,"inTangent":0,"outTangent":0,"id":"O-20","inMagnitude":-0.1,"outMagnitude":0.1}),new Keyframe({"time":0.5033898305084745,"value":0.5,"inTangent":0,"outTangent":0,"id":"O-21","inMagnitude":-0.1,"outMagnitude":0.1}),new Keyframe({"time":0.8,"value":0.65,"inTangent":0,"outTangent":0,"id":"O-22","inMagnitude":-0.1,"outMagnitude":0.1}),new Keyframe({"time":1,"value":0.1,"inTangent":0,"outTangent":0,"id":"O-17","inMagnitude":-0.1,"outMagnitude":0.1})])
})
)}

function _12(md){return(
md `---`
)}

function _yTranslation(chartEditor,Curve,Keyframe){return(
chartEditor({ 
  title:'Y translation',
  easePreview: false, 
  boundFirstLast: false,
  defaultCurve:

  new Curve([new Keyframe({"time":0,"value":0,"inTangent":0,"outTangent":0,"id":"O-34","inMagnitude":-0.1,"outMagnitude":0.1}),new Keyframe({"time":0.5,"value":1,"inTangent":0,"outTangent":0,"id":"O-38","inMagnitude":-0.1,"outMagnitude":0.1}),new Keyframe({"time":1,"value":0,"inTangent":0,"outTangent":0,"id":"O-35","inMagnitude":-0.1,"outMagnitude":0.1})])
})
)}

function _14(md){return(
md `---`
)}

function _yRotation(chartEditor){return(
chartEditor({ 
  title:'Y rotation',
  easePreview: false, 
  boundFirstLast: false,
  enableD3Easing: true,
  defaultCurve: 'easeCubicOut'
})
)}

function _16(md){return(
md `---`
)}

function _coloring(chartEditor,Curve,Keyframe){return(
chartEditor({ 
  title:'Color',
  easePreview: false,  
  boundFirstLast: false, 
  defaultCurve: 
  
new Curve([new Keyframe({"time":0,"value":0,"inTangent":0,"outTangent":0,"id":"O-1","inMagnitude":-0.1,"outMagnitude":0.1}),new Keyframe({"time":0.25,"value":0.6,"inTangent":5.853174603174595,"outTangent":1.6635338345864668,"id":"O-2","inMagnitude":-0.1,"outMagnitude":0.12881355932203392}),new Keyframe({"time":1,"value":1,"inTangent":0,"outTangent":0,"id":"O-3","inMagnitude":-0.1,"outMagnitude":0.1})])
  
})
)}

function _18(md){return(
md`---`
)}

function _19(md){return(
md`---
## Three.js elements`
)}

function* _update(oscillator,animationDuration,renderer,cube,scaleAmount,scaling,translationAmount,yTranslation,rotationAmount,yRotation,THREE,customInterpolator,coloring,light,cubeWire,wireframe,floorWire,scene,camera)
{
  for (const t of oscillator(animationDuration)) {
    requestAnimationFrame(renderer.render);

    cube.scale.y = scaleAmount * scaling(t);
    cube.position.y = translationAmount * yTranslation(t);
    cube.rotation.y = rotationAmount * yRotation(t);

    const color = new THREE.Color(customInterpolator(coloring(t)));

    cube.material.emissive = color;
    light.color = color;

    cubeWire.visible = wireframe;
    floorWire.visible = wireframe;

    renderer.render(scene, camera);
    yield renderer;
  }
}


function _renderer(THREE){return(
new THREE.WebGLRenderer({antialias: true})
)}

function _scene(THREE,cube,light,floor)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x506680);
  
  scene.add( new THREE.AmbientLight(0xffffff, 0.2));
  cube.add(light);
  scene.add(cube);
  
  floor.position.y = -50.15;
  scene.add(floor);
  
  return scene;
}


function _cube(THREE,$0)
{
  const material = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 30});
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const mesh = new THREE.Mesh(geometry, material);
  
  // wireframe
  const geo = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
  const mat = new THREE.LineBasicMaterial( { color: 0x1d1d1611, linewidth: 1 } );
  const wireframe = new THREE.LineSegments( geo, mat );
  mesh.add( wireframe );
  $0.value = wireframe;
  
  return mesh;
}


function _cubeWire(){return(
null
)}

function _floor(THREE,$0)
{
  const material = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: 10});
  const geometry = new THREE.BoxGeometry(7, 100, 7);
  const mesh = new THREE.Mesh(geometry, material);
  
   // wireframe
  const geo = new THREE.EdgesGeometry( mesh.geometry ); // or WireframeGeometry
  const mat = new THREE.LineBasicMaterial( { color: 0x1d1d1611, linewidth: 1 } );
  const wireframe = new THREE.LineSegments( geo, mat );
  mesh.add( wireframe );
  $0.value = wireframe;
  
  return mesh;
}


function _floorWire(){return(
null
)}

function _light(THREE)
{
  const light = new THREE.PointLight( 0xffffff, 0.25, 50);
  
  return light;
}


function _camera(width,height,THREE)
{
  const fov = 45;
  const aspect = width / height;
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(10, 10, -10)
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
}


function _29(md){return(
md`---`
)}

function _height(){return(
600
)}

function _oscillator(){return(
function* oscillator(period) {
  while (true) {
    yield Date.now() % period / period;
  }
}
)}

function _32(md){return(
md`---`
)}

async function _THREE(require)
{
  const THREE = window.THREE = await require("three@0.99.0/build/three.min.js");
  await require("three@0.99.0/examples/js/controls/OrbitControls.js").catch(() => {});
  return THREE;
}


function _d3(require){return(
require('d3')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["THREE","camera","renderer","invalidation","width","height","scene"], _3);
  main.variable(observer("viewof wireframe")).define("viewof wireframe", ["checkbox"], _wireframe);
  main.variable(observer("wireframe")).define("wireframe", ["Generators", "viewof wireframe"], (G, _) => G.input(_));
  main.variable(observer("viewof customInterpolator")).define("viewof customInterpolator", ["colorInterpolatorPicker"], _customInterpolator);
  main.variable(observer("customInterpolator")).define("customInterpolator", ["Generators", "viewof customInterpolator"], (G, _) => G.input(_));
  main.variable(observer("viewof animationDuration")).define("viewof animationDuration", ["number"], _animationDuration);
  main.variable(observer("animationDuration")).define("animationDuration", ["Generators", "viewof animationDuration"], (G, _) => G.input(_));
  main.variable(observer("viewof translationAmount")).define("viewof translationAmount", ["number"], _translationAmount);
  main.variable(observer("translationAmount")).define("translationAmount", ["Generators", "viewof translationAmount"], (G, _) => G.input(_));
  main.variable(observer("viewof scaleAmount")).define("viewof scaleAmount", ["number"], _scaleAmount);
  main.variable(observer("scaleAmount")).define("scaleAmount", ["Generators", "viewof scaleAmount"], (G, _) => G.input(_));
  main.variable(observer("viewof rotationAmount")).define("viewof rotationAmount", ["number"], _rotationAmount);
  main.variable(observer("rotationAmount")).define("rotationAmount", ["Generators", "viewof rotationAmount"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","animationDuration"], _10);
  main.variable(observer("viewof scaling")).define("viewof scaling", ["chartEditor","Curve","Keyframe"], _scaling);
  main.variable(observer("scaling")).define("scaling", ["Generators", "viewof scaling"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("viewof yTranslation")).define("viewof yTranslation", ["chartEditor","Curve","Keyframe"], _yTranslation);
  main.variable(observer("yTranslation")).define("yTranslation", ["Generators", "viewof yTranslation"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof yRotation")).define("viewof yRotation", ["chartEditor"], _yRotation);
  main.variable(observer("yRotation")).define("yRotation", ["Generators", "viewof yRotation"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof coloring")).define("viewof coloring", ["chartEditor","Curve","Keyframe"], _coloring);
  main.variable(observer("coloring")).define("coloring", ["Generators", "viewof coloring"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("update")).define("update", ["oscillator","animationDuration","renderer","cube","scaleAmount","scaling","translationAmount","yTranslation","rotationAmount","yRotation","THREE","customInterpolator","coloring","light","cubeWire","wireframe","floorWire","scene","camera"], _update);
  main.variable(observer("renderer")).define("renderer", ["THREE"], _renderer);
  main.variable(observer("scene")).define("scene", ["THREE","cube","light","floor"], _scene);
  main.variable(observer("cube")).define("cube", ["THREE","mutable cubeWire"], _cube);
  main.define("initial cubeWire", _cubeWire);
  main.variable(observer("mutable cubeWire")).define("mutable cubeWire", ["Mutable", "initial cubeWire"], (M, _) => new M(_));
  main.variable(observer("cubeWire")).define("cubeWire", ["mutable cubeWire"], _ => _.generator);
  main.variable(observer("floor")).define("floor", ["THREE","mutable floorWire"], _floor);
  main.define("initial floorWire", _floorWire);
  main.variable(observer("mutable floorWire")).define("mutable floorWire", ["Mutable", "initial floorWire"], (M, _) => new M(_));
  main.variable(observer("floorWire")).define("floorWire", ["mutable floorWire"], _ => _.generator);
  main.variable(observer("light")).define("light", ["THREE"], _light);
  main.variable(observer("camera")).define("camera", ["width","height","THREE"], _camera);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("oscillator")).define("oscillator", _oscillator);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1);
  main.import("chartEditor", child1);
  main.import("Curve", child1);
  main.import("Keyframe", child1);
  const child2 = runtime.module(define2);
  main.import("colorInterpolatorPicker", child2);
  const child3 = runtime.module(define3);
  main.import("checkbox", child3);
  main.import("number", child3);
  return main;
}
