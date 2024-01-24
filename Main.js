// import css, three
import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as Shapes from './Shapes.js';

// Set constants
const Scene = new THREE.Scene();
const Camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const Renderer = new THREE.WebGLRenderer();
const Background = new THREE.TextureLoader().load('Background.jpg'); // or just replace with png
const Light = new THREE.PointLight(0x404040,5,0,2);
const gltfloader = new GLTFLoader();
const objloader = new OBJLoader();

// set render size
Renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( Renderer.domElement );


// set full render size
function windowResize() {
  Camera.aspect = window.innerWidth / window.innerHeight;
  Camera.updateProjectionMatrix();

  Renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', windowResize);

// set background
Scene.background = Background;

// Load Teapot model
gltfloader.load('Teapot.gltf', function(gltf) {
  const Teapot = gltf.scene;
  
  Teapot.position.z = -5;
  Teapot.position.x = -6;
  Teapot.position.y = -15;

  Teapot.scale.set(0.5,0.5,0.5);

  Teapot.rotation.y = 135;
  Teapot.rotation.x = 35;
  Teapot.rotation.z = 135;
  
  Scene.add(Teapot);
});

// Load Suzane model
gltfloader.load('Suzanne.glb', function(gltf) {
  const Suzanne = gltf.scene;
  
  Suzanne.position.z = -5;
  Suzanne.position.y = -5;
  Suzanne.position.x = -6;

  Scene.add(Suzanne);
});

// add objects to scene
function LoadObjects(Light,Cube,Heart,Dodecahedron,Tetrahedron) {
Scene.add(Light,Cube,Heart,Dodecahedron,Tetrahedron);
}
LoadObjects(Light,Shapes.Cube,Shapes.HeartMesh,Shapes.Dodecahedron,Shapes.Tetrahedron);

// scroll animation
function MoveCamera() {
  const t = document.body.getBoundingClientRect().top;

  Camera.position.y = t * 0.01;
  Light.position.set(Camera.position.x,Camera.position.y,Camera.position.z);
}

document.body.onscroll = MoveCamera;
MoveCamera();

// animate loop
function Animate() {
	requestAnimationFrame( Animate );
	Renderer.render( Scene, Camera );

  // rotate objects
  Shapes.Cube.rotation.y += 0.001;
  Shapes.Cube.rotation.x += 0.001;

  Shapes.Dodecahedron.rotation.y += 0.001;
  Shapes.Dodecahedron.rotation.x += 0.001;

  Shapes.Tetrahedron.rotation.y += 0.001;
  Shapes.Tetrahedron.rotation.x += 0.001;


}
Animate();