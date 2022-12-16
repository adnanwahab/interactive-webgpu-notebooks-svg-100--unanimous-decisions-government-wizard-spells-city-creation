
//			import * as THREE from 'three';

			import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
			import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

            import './style.css'
            import * as THREE from 'three'
            import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
            import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
            import * as dat from 'lil-gui'
            import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
            import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
            import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
            import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
            import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
            import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js'
            import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js'
            import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
            import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'
            


			const params = {
				color: 0xffffff,
				transmission: 1,
				opacity: 1,
				metalness: 0,
				roughness: 0,
				ior: 1.5,
				thickness: 0.01,
				specularIntensity: 1,
				specularColor: 0xffffff,
				envMapIntensity: 1,
				lightIntensity: 1,
				exposure: 1
			};

			let camera, scene, renderer;

			let mesh;

			const hdrEquirect = new RGBELoader()
				.setPath( './' )
				.load( 'royal_esplanade_1k.hdr', function () {
					hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
					init();
					render();
				} );

			function init() {

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				document.body.appendChild( renderer.domElement );

				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = params.exposure;

				renderer.outputEncoding = THREE.sRGBEncoding;

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.set( 0, 0, 120 );

				//

				scene.background = hdrEquirect;

				//

				const geometry = new THREE.SphereGeometry( 20, 64, 32 );

				const texture = new THREE.CanvasTexture( generateTexture() );
				texture.magFilter = THREE.NearestFilter;
				texture.wrapT = THREE.RepeatWrapping;
				texture.wrapS = THREE.RepeatWrapping;
				texture.repeat.set( 1, 3.5 );

				const material = new THREE.MeshPhysicalMaterial( {
					color: params.color,
					metalness: params.metalness,
					roughness: params.roughness,
					ior: params.ior,
					alphaMap: texture,
					envMap: hdrEquirect,
					envMapIntensity: params.envMapIntensity,
					transmission: params.transmission, // use material.transmission for glass materials
					specularIntensity: params.specularIntensity,
					specularColor: params.specularColor,
					opacity: params.opacity,
					side: THREE.DoubleSide,
					transparent: true
				} );

				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );

				//

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = 10;
				controls.maxDistance = 150;

				window.addEventListener( 'resize', onWindowResize );

				//

				const gui = new GUI();

				gui.addColor( params, 'color' )
					.onChange( function () {

						material.color.set( params.color );
						render();

					} );

				gui.add( params, 'transmission', 0, 1, 0.01 )
					.onChange( function () {

						material.transmission = params.transmission;
						render();

					} );

				gui.add( params, 'opacity', 0, 1, 0.01 )
					.onChange( function () {

						material.opacity = params.opacity;
						render();

					} );

				gui.add( params, 'metalness', 0, 1, 0.01 )
					.onChange( function () {

						material.metalness = params.metalness;
						render();

					} );

				gui.add( params, 'roughness', 0, 1, 0.01 )
					.onChange( function () {

						material.roughness = params.roughness;
						render();

					} );

				gui.add( params, 'ior', 1, 2, 0.01 )
					.onChange( function () {

						material.ior = params.ior;
						render();

					} );

				gui.add( params, 'thickness', 0, 5, 0.01 )
					.onChange( function () {

						material.thickness = params.thickness;
						render();

					} );

				gui.add( params, 'specularIntensity', 0, 1, 0.01 )
					.onChange( function () {

						material.specularIntensity = params.specularIntensity;
						render();

					} );

				gui.addColor( params, 'specularColor' )
					.onChange( function () {

						material.specularColor.set( params.specularColor );
						render();

					} );

				gui.add( params, 'envMapIntensity', 0, 1, 0.01 )
					.name( 'envMap intensity' )
					.onChange( function () {

						material.envMapIntensity = params.envMapIntensity;
						render();

					} );

				gui.add( params, 'exposure', 0, 1, 0.01 )
					.onChange( function () {

						renderer.toneMappingExposure = params.exposure;
						render();

					} );

				gui.open();

			}

			function onWindowResize() {

				const width = window.innerWidth;
				const height = window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				renderer.setSize( width, height );

				render();

			}

			//

			function generateTexture() {

				const canvas = document.createElement( 'canvas' );
				canvas.width = 2;
				canvas.height = 2;

				const context = canvas.getContext( '2d' );
				context.fillStyle = 'white';
				context.fillRect( 0, 1, 2, 1 );

				return canvas;

			}

			function render() {

				renderer.render( scene, camera );

			}






// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI()

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Loaders
//  */
// const gltfLoader = new GLTFLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()
// const textureLoader = new THREE.TextureLoader()

// /**
//  * Update all materials
//  */
// const updateAllMaterials = () =>
// {
//     scene.traverse((child) =>
//     {
//         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
//         {
//             child.material.envMapIntensity = 2.5
//             child.material.needsUpdate = true
//             child.castShadow = true
//             child.receiveShadow = true
//         }
//     })
// }

// /**
//  * Environment map
//  */
// const environmentMap = cubeTextureLoader.load([
//     '/textures/environmentMaps/0/px.jpg',
//     '/textures/environmentMaps/0/nx.jpg',
//     '/textures/environmentMaps/0/py.jpg',
//     '/textures/environmentMaps/0/ny.jpg',
//     '/textures/environmentMaps/0/pz.jpg',
//     '/textures/environmentMaps/0/nz.jpg'
// ])
// environmentMap.encoding = THREE.sRGBEncoding

// scene.background = environmentMap
// scene.environment = environmentMap

// /**
//  * Models
//  */
// gltfLoader.load(
//     '/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(2, 2, 2)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//         updateAllMaterials()
//     }
// )

// /**
//  * Lights
//  */
// const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.normalBias = 0.05
// directionalLight.position.set(0.25, 3, - 2.25)
// scene.add(directionalLight)

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//     // Update effect composer
//     effectComposer.setSize(sizes.width, sizes.height)
//     effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(4, 1, - 4)
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true
// })
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFShadowMap
// renderer.physicallyCorrectLights = true
// renderer.outputEncoding = THREE.sRGBEncoding
// renderer.toneMapping = THREE.ReinhardToneMapping
// renderer.toneMappingExposure = 1.5
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Post processing
//  */
// const renderTarget = new THREE.WebGLRenderTarget(
//     800,
//     600,
//     {
//         samples: 2
//     }
// )

// // Effect composer
// const effectComposer = new EffectComposer(renderer, renderTarget)
// effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// effectComposer.setSize(sizes.width, sizes.height)

// // Render pass
// const renderPass = new RenderPass(scene, camera)
// effectComposer.addPass(renderPass)

// // Dot screen pass
// const dotScreenPass = new DotScreenPass()
// dotScreenPass.enabled = false
// effectComposer.addPass(dotScreenPass)

// // Glitch pass
// const glitchPass = new GlitchPass()
// glitchPass.goWild = true
// glitchPass.enabled = false
// effectComposer.addPass(glitchPass)

// // RGB Shift pass
// const rgbShiftPass = new ShaderPass(RGBShiftShader)
// rgbShiftPass.enabled = false
// effectComposer.addPass(rgbShiftPass)

// // Gamma correction pass
// const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
// effectComposer.addPass(gammaCorrectionPass)

// // Antialias pass
// if(renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2)
// {
//     const smaaPass = new SMAAPass()
//     effectComposer.addPass(smaaPass)

//     console.log('Using SMAA')
// }

// // Unreal Bloom pass
// const unrealBloomPass = new UnrealBloomPass()
// unrealBloomPass.enabled = false
// effectComposer.addPass(unrealBloomPass)

// unrealBloomPass.strength = 0.3
// unrealBloomPass.radius = 1
// unrealBloomPass.threshold = 0.6

// gui.add(unrealBloomPass, 'enabled')
// gui.add(unrealBloomPass, 'strength').min(0).max(2).step(0.001)
// gui.add(unrealBloomPass, 'radius').min(0).max(2).step(0.001)
// gui.add(unrealBloomPass, 'threshold').min(0).max(1).step(0.001)

// // Tin pass
// const TintShader = {
//     uniforms:
//     {
//         tDiffuse: { value: null },
//         uTint: { value: null }
//     },
//     vertexShader: `
//         varying vec2 vUv;

//         void main()
//         {
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

//             vUv = uv;
//         }
//     `,
//     fragmentShader: `
//         uniform sampler2D tDiffuse;
//         uniform vec3 uTint;

//         varying vec2 vUv;

//         void main()
//         {
//             vec4 color = texture2D(tDiffuse, vUv);
//             color.rgb += uTint;

//             gl_FragColor = color;
//         }
//     `
// }

// const tintPass = new ShaderPass(TintShader)
// tintPass.material.uniforms.uTint.value = new THREE.Vector3()
// effectComposer.addPass(tintPass)

// gui.add(tintPass.material.uniforms.uTint.value, 'x').min(- 1).max(1).step(0.001).name('red')
// gui.add(tintPass.material.uniforms.uTint.value, 'y').min(- 1).max(1).step(0.001).name('green')
// gui.add(tintPass.material.uniforms.uTint.value, 'z').min(- 1).max(1).step(0.001).name('blue')

// // Displacement pass
// const DisplacementShader = {
//     uniforms:
//     {
//         tDiffuse: { value: null },
//         uTime: { value: null },
//         uNormalMap: { value: null }
//     },
//     vertexShader: `
//         varying vec2 vUv;

//         void main()
//         {
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

//             vUv = uv;
//         }
//     `,
//     fragmentShader: `
//         uniform sampler2D tDiffuse;
//         uniform float uTime;
//         uniform sampler2D uNormalMap;

//         varying vec2 vUv;

//         void main()
//         {
//             vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
//             vec2 newUv = vUv + normalColor.xy * 0.1;
//             vec4 color = texture2D(tDiffuse, newUv);

//             vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
//             float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
//             color.rgb += lightness * 2.0;

//             gl_FragColor = color;
//         }
//     `
// }

// const displacementPass = new ShaderPass(DisplacementShader)
// displacementPass.material.uniforms.uTime.value = 0
// displacementPass.material.uniforms.uNormalMap.value = textureLoader.load('/textures/interfaceNormalMap.png')
// effectComposer.addPass(displacementPass)

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update passes
//     displacementPass.material.uniforms.uTime.value = elapsedTime

//     // Update controls
//     controls.update()

//     // Render
//     // renderer.render(scene, camera)
//     effectComposer.render()

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()