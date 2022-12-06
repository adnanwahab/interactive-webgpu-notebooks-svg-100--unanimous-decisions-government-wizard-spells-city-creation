import define1 from "./ba71f1bcb80e011e@346.js";
import define2 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# make whole world friends`
)}

function _2(md){return(
md`## Adapted from:
  * [Night Skies — Lights and Light Pollution WebGL Globe](https://observablehq.com/@jashkenas/night-skies-lights-and-light-pollution-globe)
  * [WebGL Globe](https://github.com/dataarts/webgl-globe)
  * [Airport Data](http://www.partow.net/miscellaneous/airportdatabase/)
  * [Data driven range sliders](https://observablehq.com/@bumbeishvili/data-driven-range-sliders)
  * [Select Filter](https://observablehq.com/@jashkenas/inputs#selectDemo)
`
)}

function _3(md){return(
md`#### Note: Collaborations with [@bumbeishvili](https://observablehq.com/@bumbeishvili) contributed toward enhanced filtering logic.`
)}

function _4(md){return(
md`## Visualization of stroke rate across the globe:`
)}

function _container(html){return(
html`<div id="globe" style="height:500px;"></div>`
)}

function _airportData(FileAttachment){return(
FileAttachment("parsedData@2.json").json()
)}

function _7(md){return(
md`## Country [filter](https://observablehq.com/@jashkenas/inputs#selectDemo) for the airportData JSON:`
)}

function _countries(select,airportData){return(
select({
  description: "Country(ies)",
  options: [...new Set(airportData.Country)].sort(),
  size: 5,
  multiple: true
})
)}

function _9(md){return(
md`## Range [filters](https://observablehq.com/@bumbeishvili/data-driven-range-sliders) for the airportData JSON:`
)}

function _10(md){return(
md`Min/Max [Altitude](https://en.wikipedia.org/wiki/Altitude) (meters):`
)}

function _altitude(btnResetAlt,rangeSlider,airportData)
{btnResetAlt; return rangeSlider(airportData["Altitude"],  d=>d)}


function _btnResetAlt(html){return(
html`<button>reset</button>`
)}

function _13(md){return(
md`Min/Max [Latitude](https://en.wikipedia.org/wiki/Latitude) (degrees):`
)}

function _latitude(btnResetLat,rangeSlider,airportData)
{btnResetLat; return rangeSlider(airportData["Latitude Decimal Degrees"],  d=>d)}


function _btnResetLat(html){return(
html`<button>reset</button>`
)}

function _16(md){return(
md`Min/Max [Longitude](https://en.wikipedia.org/wiki/Longitude) (degrees):`
)}

function _longitude(btnResetLng,rangeSlider,airportData)
{btnResetLng; return rangeSlider(airportData["Longitude Decimal Degrees"],  d=>d)}


function _btnResetLng(html){return(
html`<button>reset</button>`
)}

function _19(md){return(
md`### Source Code:`
)}

function _20(d3,altitude,airportData,countries,latitude,longitude,container,html,THREE,worldJPG_URL){return(
function fnBuildGlobe(){

  let scale = d3.scaleLinear().domain([altitude.range[0],altitude.range[1]]).range([0,1]);

  let data = [];
  //As per data format: https://github.com/dataarts/webgl-globe#data-format
  for (let i = 0; i < airportData["Latitude Decimal Degrees"].length; i++){  
    let countryFilter = countries.length > 0 ? 
        countries.some(country => country == airportData["Country"][i]) : 
    true;
    let latFilter = fnInRange(airportData["Latitude Decimal Degrees"][i],latitude);
    let lngFilter = fnInRange(airportData["Longitude Decimal Degrees"][i],longitude);
    let altFilter = fnInRange(airportData["Altitude"][i],altitude);
    if (countryFilter && latFilter && lngFilter && altFilter){
      data.push(airportData["Latitude Decimal Degrees"][i]); 
      data.push(airportData["Longitude Decimal Degrees"][i]);  
      data.push(scale(airportData["Altitude"][i])); 
    } //if
  } //for

  let globe = new datGlobe(container); 


  globe.addData(data, {format: 'magnitude', name: "GlobeData", animated: false});

  globe.createPoints();
  globe.animate();      

  function fnInRange(measure,filter){
    return measure >= filter.range[0] && measure <= filter.range[1]; 
  }  
  
  return html`⏎ Click cell to see code that builds WebGL Globe`; 

  //datGlobe constructor
  function datGlobe(container, opts) {
    opts = opts || {};

    var colorFn = opts.colorFn || function(x) {
      var c = new THREE.Color();
      c.setHSL( ( 0.6 - ( x * 0.5 ) ), 1.0, 0.5 );
      return c;
    };
    //var imgDir = opts.imgDir || '/globe/';

    //worldJPG_URL is string in ObservableHQ cell
    var imgURL = opts.imgURL || worldJPG_URL; 									
    var Shaders = {
      'earth' : {
        uniforms: {
          'texture': { type: 't', value: null }
        },
        vertexShader: [
          'varying vec3 vNormal;',
          'varying vec2 vUv;',
          'void main() {',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
          'vNormal = normalize( normalMatrix * normal );',
          'vUv = uv;',
          '}'
        ].join('\n'),
        fragmentShader: [
          'uniform sampler2D texture;',
          'varying vec3 vNormal;',
          'varying vec2 vUv;',
          'void main() {',
          'vec3 diffuse = texture2D( texture, vUv ).xyz;',
          'float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
          'vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 3.0 );',
          'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
          '}'
        ].join('\n')
      },
      'atmosphere' : {
        uniforms: {},
        vertexShader: [
          'varying vec3 vNormal;',
          'void main() {',
          'vNormal = normalize( normalMatrix * normal );',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
          '}'
        ].join('\n'),
        fragmentShader: [
          'varying vec3 vNormal;',
          'void main() {',
          'float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );',
          'gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;',
          '}'
        ].join('\n')
      }
    };

    var camera, scene, renderer, w, h;
    var mesh, atmosphere, point;

    var overRenderer;

    var curZoomSpeed = 0;
    var zoomSpeed = 50;

    var mouse = { x: 0, y: 0 }, mouseOnDown = { x: 0, y: 0 };
    var rotation = { x: 0, y: 0 },
        target = { x: Math.PI*1.7, y: Math.PI / 5.0 },
        targetOnDown = { x: 0, y: 0 };

    var distance = 100000, distanceTarget = 100000;
    var padding = 40;
    var PI_HALF = Math.PI / 2;

    var ROTATIONSPEED = 0.003;
    var k = ROTATIONSPEED;
    var f = false;

    function init() {

      container.style.color = '#fff';
      container.style.font = '13px/20px Arial, sans-serif';

      var shader, uniforms, material;
      w = container.offsetWidth || window.innerWidth;
      h = container.offsetHeight || window.innerHeight;


      camera = new THREE.PerspectiveCamera(26, w / h, 1, 10000);
      camera.position.z = distance;

      scene = new THREE.Scene();

      var geometry = new THREE.SphereGeometry(150, 40, 30);

      shader = Shaders['earth'];
      uniforms = THREE.UniformsUtils.clone(shader.uniforms);

      //uniforms['texture'].value = THREE.ImageUtils.loadTexture(imgDir+'world.jpg');

      const textureLoader = new THREE.TextureLoader;

      uniforms['texture'].value = textureLoader.load(imgURL);

      material = new THREE.ShaderMaterial({

        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader

      });

      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.y = Math.PI;
      scene.add(mesh);

      shader = Shaders['atmosphere'];
      uniforms = THREE.UniformsUtils.clone(shader.uniforms);

      material = new THREE.ShaderMaterial({

        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true

      });

      mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set( 1.1, 1.1, 1.1 );
      scene.add(mesh);

      geometry = new THREE.BoxGeometry(0.75, 0.75, 1); //geometry = new THREE.CubeGeometry(0.75, 0.75, 1);	
      geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-0.5));

      point = new THREE.Mesh(geometry);

      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setSize(w, h);

      renderer.domElement.style.position = 'absolute';

      container.appendChild(renderer.domElement);

      container.addEventListener('mousedown', onMouseDown, false);

      //container.addEventListener('mousewheel', onMouseWheel, false);
      container.addEventListener('wheel', onMouseWheel, false);

      document.addEventListener('keydown', onDocumentKeyDown, false);

      //window.addEventListener('resize', onWindowResize, false);

      container.addEventListener('mouseover', function() {
        overRenderer = true;
      }, false);

      container.addEventListener('mouseout', function() {
        overRenderer = false;
      }, false);

    } //init

    const addData = function(data, opts) {
      var lat, lng, size, color, i, step, colorFnWrapper;

      opts.animated = opts.animated || false;
      this.is_animated = opts.animated;
      opts.format = opts.format || 'magnitude'; // other option is 'legend'
      //console.log(opts.format);
      if (opts.format === 'magnitude') {
        step = 3;
        colorFnWrapper = function(data, i) { return colorFn(data[i+2]); }
      } else if (opts.format === 'legend') {
        step = 4;
        colorFnWrapper = function(data, i) { return colorFn(data[i+3]); }
      } else {
        throw('error: format not supported: '+opts.format);
      }

      if (opts.animated) {
        if (this._baseGeometry === undefined) {
          this._baseGeometry = new THREE.Geometry();
          for (i = 0; i < data.length; i += step) {
            lat = data[i];
            lng = data[i + 1];
            //        size = data[i + 2];
            color = colorFnWrapper(data,i);
            size = 0;
            addPoint(lat, lng, size, color, this._baseGeometry);
          }
        }
        if(this._morphTargetId === undefined) {
          this._morphTargetId = 0;
        } else {
          this._morphTargetId += 1;
        }
        opts.name = opts.name || 'morphTarget'+this._morphTargetId;
      }
      var subgeo = new THREE.Geometry();
      for (i = 0; i < data.length; i += step) {
        lat = data[i];
        lng = data[i + 1];
        color = colorFnWrapper(data,i);
        size = data[i + 2];
        size = size*150;
        addPoint(lat, lng, size, color, subgeo);
      }
      if (opts.animated) {
        this._baseGeometry.morphTargets.push({'name': opts.name, vertices: subgeo.vertices});
      } else {
        this._baseGeometry = subgeo;
      }

    };

    function createPoints() {
      if (this._baseGeometry !== undefined) {
        if (this.is_animated === false) {
          this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
            color: 0xffffff,
            vertexColors: THREE.FaceColors,
            morphTargets: false
          }));
        } else {
          if (this._baseGeometry.morphTargets.length < 8) {
            console.log('t l',this._baseGeometry.morphTargets.length);
            var padding = 8-this._baseGeometry.morphTargets.length;
            console.log('padding', padding);
            for(var i=0; i<=padding; i++) {
              console.log('padding',i);
              this._baseGeometry.morphTargets.push({'name': 'morphPadding'+i, 
                                                    vertices: this._baseGeometry.vertices
                                                   }
                                                  );
            }
          }
          this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
            color: 0xffffff,
            vertexColors: THREE.FaceColors,
            morphTargets: true
          }));
        }
        scene.add(this.points);
      }
    }

    function addPoint(lat, lng, size, color, subgeo) {

      var phi = (90 - lat) * Math.PI / 180;
      var theta = (180 - lng) * Math.PI / 180;

      point.position.x = 150 * Math.sin(phi) * Math.cos(theta);
      point.position.y = 150 * Math.cos(phi);
      point.position.z = 150 * Math.sin(phi) * Math.sin(theta);

      point.lookAt(mesh.position);

      point.scale.z = Math.max( size, 0.1 ); // avoid non-invertible matrix
      point.updateMatrix();

      for (var i = 0; i < point.geometry.faces.length; i++) {

        point.geometry.faces[i].color = color;

      }

      //THREE.GeometryUtils.merge(subgeo, point);
      subgeo.merge(point.geometry, point.matrix);
    }

    function onMouseDown(event) {
      event.preventDefault();

      k = 0;
      f = true;

      container.addEventListener('mousemove', onMouseMove, false);
      container.addEventListener('mouseup', onMouseUp, false);
      container.addEventListener('mouseout', onMouseOut, false);

      target.y = rotation.y;

      mouseOnDown.x = - event.clientX;
      mouseOnDown.y = event.clientY;

      targetOnDown.x = target.x;
      targetOnDown.y = target.y;

      container.style.cursor = 'move';
    }

    function onMouseMove(event) {
      mouse.x = - event.clientX;
      mouse.y = event.clientY;

      var zoomDamp = distance/1000;

      target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
      target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

      target.y = target.y > PI_HALF ? PI_HALF : target.y;
      target.y = target.y < - PI_HALF ? - PI_HALF : target.y;
    }

    function onMouseUp(event) {

      k = ROTATIONSPEED;
      f = false;

      container.removeEventListener('mousemove', onMouseMove, false);
      container.removeEventListener('mouseup', onMouseUp, false);
      container.removeEventListener('mouseout', onMouseOut, false);
      container.style.cursor = 'auto';
    }

    function onMouseOut(event) {

      k = ROTATIONSPEED;
      f = false;

      container.removeEventListener('mousemove', onMouseMove, false);
      container.removeEventListener('mouseup', onMouseUp, false);
      container.removeEventListener('mouseout', onMouseOut, false);
    }

    function onMouseWheel(event) {
      event.preventDefault();
      if (overRenderer) {
        //zoom(event.wheelDeltaY * 0.3);
        zoom(event.deltaY* 0.3 * 10);
      }
      return false;
    }

    function onDocumentKeyDown(event) {
      switch (event.keyCode) {
        case 38:
          zoom(100);
          event.preventDefault();
          break;
          case 40:
          zoom(-100);
          event.preventDefault();
          break;
      }
    }

    function onWindowResize( event ) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function zoom(delta) {
      distanceTarget -= delta;
      distanceTarget = distanceTarget > 1100 ? 1100 : distanceTarget;
      distanceTarget = distanceTarget < 350 ? 350 : distanceTarget;
    }

    function animate() {
      requestAnimationFrame(animate);
      render();

    }

    function render() {
      zoom(curZoomSpeed);

      target.x -= k;

      rotation.x += (target.x - rotation.x) * 0.2;

      if (f == true){
        rotation.y += (target.y - rotation.y) * 0.2;}
      if (f == false){
        target.y = Math.PI / 5.0;
        rotation.y += (target.y - rotation.y) * 0.02;
      };

      distance += (distanceTarget - distance) * 0.3;

      camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
      camera.position.y = distance * Math.sin(rotation.y);
      camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);

      camera.lookAt(mesh.position);

      renderer.render(scene, camera);

    }

    init();
    this.animate = animate;


    this.__defineGetter__('time', function() {
      return this._time || 0;
    });

    this.__defineSetter__('time', function(t) {
      var validMorphs = [];
      var morphDict = this.points.morphTargetDictionary;
      for(var k in morphDict) {
        if(k.indexOf('morphPadding') < 0) {
          validMorphs.push(morphDict[k]);
        }
      }
      validMorphs.sort();
      var l = validMorphs.length-1;
      var scaledt = t*l+1;
      var index = Math.floor(scaledt);
      for (var i=0;i<validMorphs.length;i++) {
        this.points.morphTargetInfluences[validMorphs[i]] = 0;
      }
      var lastIndex = index - 1;
      var leftover = scaledt - index;
      if (lastIndex >= 0) {
        this.points.morphTargetInfluences[lastIndex] = 1 - leftover;
      }
      this.points.morphTargetInfluences[index] = leftover;
      this._time = t;
    });

    this.addData = addData;
    this.createPoints = createPoints;
    this.renderer = renderer;
    this.scene = scene;

    return this;

  } //datGlobe  

}()
)}

function _21(md){return(
md`### Image used for globe's texture:`
)}

function _worldJPG_URL(){return(
"https://gist.githubusercontent.com/MarioDelgadoSr/2a74c279eb984e755706940288494af3/raw/f03c3a0bc942f0835286b750a390cbbc0492bde6/world.jpg"
)}

function _imagePreview(DOM,worldJPG_URL)
{
  const img = DOM.element("img");
  img.src = worldJPG_URL;
  img.style.maxHeight = "350px";
  return img;
}


function _d3(require){return(
require("d3@6")
)}

async function _THREE(require)
{
  const THREE = window.THREE = await require("three@0.99.0/build/three.min.js");
  return window.THREE;
  //const THREE = window.THREE = await require('three');
  //return THREE;  
  
}


function _TWEEN(require){return(
require("https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js")
)}

function _parseddata2(FileAttachment){return(
FileAttachment("parsedData@2.json").json()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["parsedData@2.json", {url: new URL("./files/c3f01bc5864e8f8f66aec95b3b28a807812997e3a3e4443044da5cc3e9c29d470856fc630e31b2f6102cdc91396d2332970f33659170bc8a851f80137970d958.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("container")).define("container", ["html"], _container);
  main.variable(observer("airportData")).define("airportData", ["FileAttachment"], _airportData);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("viewof countries")).define("viewof countries", ["select","airportData"], _countries);
  main.variable(observer("countries")).define("countries", ["Generators", "viewof countries"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof altitude")).define("viewof altitude", ["btnResetAlt","rangeSlider","airportData"], _altitude);
  main.variable(observer("altitude")).define("altitude", ["Generators", "viewof altitude"], (G, _) => G.input(_));
  main.variable(observer("viewof btnResetAlt")).define("viewof btnResetAlt", ["html"], _btnResetAlt);
  main.variable(observer("btnResetAlt")).define("btnResetAlt", ["Generators", "viewof btnResetAlt"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("viewof latitude")).define("viewof latitude", ["btnResetLat","rangeSlider","airportData"], _latitude);
  main.variable(observer("latitude")).define("latitude", ["Generators", "viewof latitude"], (G, _) => G.input(_));
  main.variable(observer("viewof btnResetLat")).define("viewof btnResetLat", ["html"], _btnResetLat);
  main.variable(observer("btnResetLat")).define("btnResetLat", ["Generators", "viewof btnResetLat"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("viewof longitude")).define("viewof longitude", ["btnResetLng","rangeSlider","airportData"], _longitude);
  main.variable(observer("longitude")).define("longitude", ["Generators", "viewof longitude"], (G, _) => G.input(_));
  main.variable(observer("viewof btnResetLng")).define("viewof btnResetLng", ["html"], _btnResetLng);
  main.variable(observer("btnResetLng")).define("btnResetLng", ["Generators", "viewof btnResetLng"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["d3","altitude","airportData","countries","latitude","longitude","container","html","THREE","worldJPG_URL"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("worldJPG_URL")).define("worldJPG_URL", _worldJPG_URL);
  main.variable(observer("imagePreview")).define("imagePreview", ["DOM","worldJPG_URL"], _imagePreview);
  const child1 = runtime.module(define1);
  main.import("rangeSlider", child1);
  const child2 = runtime.module(define2);
  main.import("select", child2);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("THREE")).define("THREE", ["require"], _THREE);
  main.variable(observer("TWEEN")).define("TWEEN", ["require"], _TWEEN);
  main.variable(observer("parseddata2")).define("parseddata2", ["FileAttachment"], _parseddata2);
  return main;
}
