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

// predefine torusknot
const TorusKnotSize = 0.25;
const TorusKnotGeometry = new THREE.TorusKnotGeometry( 10 * TorusKnotSize, 3 * TorusKnotSize, 50 * TorusKnotSize, 8 * TorusKnotSize);
const TorusKnotMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const TorusKnot = new THREE.Mesh( TorusKnotGeometry, TorusKnotMaterial );
TorusKnot.position.z = -5;
TorusKnot.position.x = -5;

// predefine heart
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

const XAxis = new THREE.Vector3(0, 0, 1);
const HeartGeometry = new THREE.ShapeGeometry( HeartShape );
const HeartMaterial = new THREE.MeshBasicMaterial( { color: 0xE81224 } );
const HeartMesh = new THREE.Mesh( HeartGeometry, HeartMaterial ) ;
HeartMesh.scale.set(HeartShapeScale,HeartShapeScale,HeartShapeScale);
HeartMesh.position.z = -5;
HeartMesh.position.x = 5;
HeartMesh.rotateOnAxis(XAxis,1.570796 * 2);

// set background
Scene.background = GaleCrater;

// add cube and torusknot to scene
//Scene.add(Cube);
//Scene.add(TorusKnot);
Scene.add(HeartMesh);

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

  // rotate box
  Cube.rotation.x += 0.001;
  Cube.rotation.y += 0.001;

  // rotate torus
  TorusKnot.rotation.x += 0.001;
  TorusKnot.rotation.y += 0.001;
}
animate();