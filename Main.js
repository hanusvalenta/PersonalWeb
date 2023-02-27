// import css, three and GLTF file fprmat loader
import './style.css';
import * as THREE from 'three';

// Set constants
const Scene = new THREE.Scene();
const Camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const Renderer = new THREE.WebGLRenderer();
const Light = new THREE.AmbientLight(0x404040, 20);
const gltfLoader = new THREE.GLTFLoader();

// set render size
Renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( Renderer.domElement );

// predefine Cube
const BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const BoxMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const Cube = new THREE.Mesh( BoxGeometry, BoxMaterial );

// add cube and light to scene
Scene.add(Light);
Scene.add(Cube);

// Load teapot
gltfLoader.load('')

// move camera a bit
Camera.position.z = 5;

// animate loop
function animate() {
	requestAnimationFrame( animate );
	Renderer.render( Scene, Camera );

  // rotate box a bit
  Cube.rotation.x += 0.01;
  Cube.rotation.y += 0.01;
}
animate();