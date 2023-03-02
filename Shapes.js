import * as THREE from 'three';

// define axies (why doesn't three have predefined varibles for this?)
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
const HeartMaterial = new THREE.MeshPhysicalMaterial( { color: 0xE81224 } );
export const HeartMesh = new THREE.Mesh( HeartGeometry, HeartMaterial );

HeartMesh.scale.set(HeartShapeScale,HeartShapeScale,HeartShapeScale);

HeartMesh.position.z = -5;
HeartMesh.position.x = 6;
HeartMesh.position.y = 1;

HeartMesh.rotation.z = 135;

// cube
const BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const BoxMaterial = new THREE.MeshPhysicalMaterial( { color: 0xffffff } );
export const Cube = new THREE.Mesh( BoxGeometry, BoxMaterial );

Cube.position.z = -25;
Cube.position.x = 6;

// dodecahedron
const DodecahedronGeometry = new THREE.DodecahedronGeometry(1,0);
const DodecahedronMaterial = new THREE.MeshPhysicalMaterial( { color: 0xffffff } );
export const Dodecahedron = new THREE.Mesh( DodecahedronGeometry, DodecahedronMaterial );

Dodecahedron.position.z = -15;
Dodecahedron.position.x = -6;

// tetrahedron

const TetrahedronGeometry = new THREE.TetrahedronGeometry(1,0);
const TetrahedronMaterial = new THREE.MeshPhysicalMaterial( { color: 0xffffff } );
export const Tetrahedron = new THREE.Mesh( TetrahedronGeometry, TetrahedronMaterial );

Tetrahedron.position.z = -35;
Tetrahedron.position.x = -6;
