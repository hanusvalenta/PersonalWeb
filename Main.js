// import css, three
import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// Predefined axes
const { Vector3 } = THREE;
const XAxis = new Vector3(1, 0, 0);
const YAxis = new Vector3(0, 1, 0);
const ZAxis = new Vector3(0, 0, 1);

// Heart
const HeartShapeScale = 0.05;
const heartX = 0, heartY = 0;
const heartShape = new THREE.Shape();

heartShape.moveTo(heartX + 5, heartY + 5);
heartShape.bezierCurveTo(heartX + 5, heartY + 5, heartX + 4, heartY, heartX, heartY);
heartShape.bezierCurveTo(heartX - 6, heartY, heartX - 6, heartY + 7, heartX - 6, heartY + 7);
heartShape.bezierCurveTo(heartX - 6, heartY + 11, heartX - 3, heartY + 15.4, heartX + 5, heartY + 19);
heartShape.bezierCurveTo(heartX + 12, heartY + 15.4, heartX + 16, heartY + 11, heartX + 16, heartY + 7);
heartShape.bezierCurveTo(heartX + 16, heartY + 7, heartX + 16, heartY, heartX + 10, heartY);
heartShape.bezierCurveTo(heartX + 7, heartY, heartX + 5, heartY + 5, heartX + 5, heartY + 5);

const heartGeometry = new THREE.ShapeGeometry(heartShape);
const heartMaterial = new THREE.MeshPhysicalMaterial({ color: 0xec0927 });
const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);

heartMesh.scale.set(HeartShapeScale, HeartShapeScale, HeartShapeScale);

heartMesh.position.set(6, 1, -5);
heartMesh.rotation.z = 135;

// Constants
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const light = new THREE.PointLight(0x404040, 5, 0, 2);
const gltfLoader = new GLTFLoader();
const objLoader = new OBJLoader();

// Set render size
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color to white
scene.background = new THREE.Color(0xffffff);

// Add objects to scene
function loadObjects() {
  scene.add(light, heartMesh);
}
loadObjects();

// Window resize event
function windowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', windowResize);

// Scroll animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.y = t * 0.01;
  light.position.copy(camera.position);
}
document.body.onscroll = moveCamera;
moveCamera();

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Load models
async function loadModels() {
  const teapot = await gltfLoader.loadAsync('Teapot.gltf');
  teapot.scene.position.set(-6, -15, -5);
  teapot.scene.scale.set(0.5, 0.5, 0.5);
  teapot.scene.rotation.set(35, 0, 135);
  scene.add(teapot.scene);

  const suzanne = await gltfLoader.loadAsync('Suzanne.glb');
  suzanne.scene.position.set(-6, -5, -5);
  scene.add(suzanne.scene);
}
loadModels();