// import css, three
import './style.css';
import * as THREE from 'three';

// Set constants
const Scene = new THREE.Scene();
const Camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const Renderer = new THREE.WebGLRenderer();
const GaleCrater = new THREE.TextureLoader().load('GaleCrater.png');

// set render size
Renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( Renderer.domElement );

// predefine Cube
const BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const BoxMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const Cube = new THREE.Mesh( BoxGeometry, BoxMaterial );
Cube.position.z = -5;
Cube.position.x = 5;

// set background
Scene.background = GaleCrater;

// add cube to scene
Scene.add(Cube);

// move camera a bit
Camera.position.z = 0;

// scroll animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  Camera.position.z = t * 0.01;
}

document.body.onscroll = moveCamera;
moveCamera();

// animate loop
function animate() {
	requestAnimationFrame( animate );
	Renderer.render( Scene, Camera );

  // rotate box a bit
  Cube.rotation.x += 0.01;
  Cube.rotation.y += 0.01;
}
animate();