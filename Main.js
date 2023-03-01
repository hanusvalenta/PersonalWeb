// import css, three
import './style.css';
import * as THREE from 'three';

import * as Shapes from './Shapes.js';

// Set constants
const Scene = new THREE.Scene();
const Camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const Renderer = new THREE.WebGLRenderer();
const GaleCrater = new THREE.TextureLoader().load('GaleCrater.png');
const Light = new THREE.PointLight(0x404040,5,0,2);

// set render size
Renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( Renderer.domElement );

// set background
Scene.background = GaleCrater;

// add objects to scene
function LoadObjects(Light,Cube,Heart,Dodecahedron,Tetrahedron) {
Scene.add(Light,Cube,Heart,Dodecahedron,Tetrahedron);
}
LoadObjects(Light,Shapes.Cube,Shapes.HeartMesh,Shapes.Dodecahedron,Shapes.Tetrahedron);

// scroll animation
function MoveCamera() {
  const t = document.body.getBoundingClientRect().top;

  Camera.position.z = t * 0.01;
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

  Shapes.Dodecahedron.rotation.x += 0.001;
  Shapes.Dodecahedron.rotation.x += 0.001;

  Shapes.Tetrahedron.rotation.x += 0.001;
  Shapes.Tetrahedron.rotation.x += 0.001;
}
Animate();