// import css, three
import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// define axies (why doesn't three have predefined variables for this?)
const XAxis = new THREE.Vector3(1,0,0);
const YAxis = new THREE.Vector3(0,1,0);
const ZAxis = new THREE.Vector3(0,0,1);

// heart
const HeartShapeScale = 0.05;
const x = 0, y = 0;
const HeartShape = new THREE.Shape();

HeartShape.moveTo( x + 5, y + 5 );
HeartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
HeartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
HeartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
HeartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
HeartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
HeartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const HeartGeometry = new THREE.ShapeGeometry( HeartShape );
const HeartMaterial = new THREE.MeshPhysicalMaterial( { color: 0xec0927 } );
const HeartMesh = new THREE.Mesh( HeartGeometry, HeartMaterial );

HeartMesh.scale.set(HeartShapeScale,HeartShapeScale,HeartShapeScale);

HeartMesh.position.z = -5;
HeartMesh.position.x = 6;
HeartMesh.position.y = 1;

HeartMesh.rotation.z = 135;

// cube
const BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const BoxMaterial = new THREE.MeshPhysicalMaterial( { color: 0x000000 } );
const Cube = new THREE.Mesh( BoxGeometry, BoxMaterial );

Cube.position.z = -5;
Cube.position.y = -10;
Cube.position.x = 6;

// tetrahedron

const TetrahedronGeometry = new THREE.TetrahedronGeometry(1,0);
const TetrahedronMaterial = new THREE.MeshPhysicalMaterial( { color: 0x000000 } );
const Tetrahedron = new THREE.Mesh( TetrahedronGeometry, TetrahedronMaterial );

Tetrahedron.position.y = -35;
Tetrahedron.position.x = -5;
Tetrahedron.position.z = -5;

// Set constants
const Scene = new THREE.Scene();
const Camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const Renderer = new THREE.WebGLRenderer();
const Light = new THREE.PointLight(0x404040, 5, 0, 2);
const gltfloader = new GLTFLoader();
const objloader = new OBJLoader();

// set render size
Renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(Renderer.domElement);

// set full render size
function windowResize() {
  Camera.aspect = window.innerWidth / window.innerHeight;
  Camera.updateProjectionMatrix();
  Renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', windowResize);

// set background color to white
Scene.background = new THREE.Color(0xffffff); // white color

// Load Teapot model
gltfloader.load('Teapot.gltf', function(gltf) {
  const Teapot = gltf.scene;
  
  Teapot.position.z = -5;
  Teapot.position.x = -6;
  Teapot.position.y = -15;

  Teapot.scale.set(0.5, 0.5, 0.5);

  Teapot.rotation.y = 135;
  Teapot.rotation.x = 35;
  Teapot.rotation.z = 135;
  
  Scene.add(Teapot);
});

// Load Suzanne model
gltfloader.load('Suzanne.glb', function(gltf) {
  const Suzanne = gltf.scene;
  
  Suzanne.position.z = -5;
  Suzanne.position.y = -5;
  Suzanne.position.x = -6;

  Scene.add(Suzanne);
});

// add objects to scene
function LoadObjects(Light) {
  Scene.add(Light, Cube, HeartMesh, Tetrahedron);
}
LoadObjects(Light);

// scroll animation
function MoveCamera() {
  const t = document.body.getBoundingClientRect().top;

  Camera.position.y = t * 0.01;
  Light.position.set(Camera.position.x, Camera.position.y, Camera.position.z);
}

document.body.onscroll = MoveCamera;
MoveCamera();

// animate loop
function Animate() {
  requestAnimationFrame(Animate);
  Renderer.render(Scene, Camera);

  // rotate objects
  Cube.rotation.y += 0.001;
  Cube.rotation.x += 0.001;

  Tetrahedron.rotation.y += 0.001;
  Tetrahedron.rotation.x += 0.001;
}

Animate();