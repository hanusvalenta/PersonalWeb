import './Style.css';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const canvas = document.getElementById("display-canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });

function updateCanvasSize() {
  const width = document.body.scrollWidth;
  const height = document.body.scrollHeight;
  renderer.setSize(width, height);
  effect.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

updateCanvasSize();
effect.domElement.style.color = 'white';
effect.domElement.style.backgroundColor = 'black';
document.body.appendChild(effect.domElement);
document.body.removeChild(renderer.domElement);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

const heartShape = new THREE.Shape()
  .moveTo(5, 5)
  .bezierCurveTo(5, 5, 4, 0, 0, 0)
  .bezierCurveTo(-6, 0, -6, 7, -6, 7)
  .bezierCurveTo(-6, 11, -3, 15.4, 5, 19)
  .bezierCurveTo(12, 15.4, 16, 11, 16, 7)
  .bezierCurveTo(16, 7, 16, 0, 10, 0)
  .bezierCurveTo(7, 0, 5, 5, 5, 5);

const heartGeometry = new THREE.ShapeGeometry(heartShape);
const heartMaterial = new THREE.MeshPhysicalMaterial({ color: 0xec0927 });
const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
heartMesh.scale.set(0.05, 0.05, 0.05);
heartMesh.position.set(6, 1, -5);
heartMesh.rotation.z = Math.PI / 4;
scene.add(heartMesh);

const crossMaterial = new THREE.MeshPhysicalMaterial({ color: 0xFFD700 });
const verticalBar = new THREE.BoxGeometry(0.2, 1, 0.2);
const horizontalBar = new THREE.BoxGeometry(0.6, 0.2, 0.2);

const verticalMesh = new THREE.Mesh(verticalBar, crossMaterial);
const horizontalMesh = new THREE.Mesh(horizontalBar, crossMaterial);
horizontalMesh.position.y = 0.3;
verticalMesh.add(horizontalMesh);
verticalMesh.position.set(2.25, 0, -5);
scene.add(verticalMesh);

const donutGeometry = new THREE.TorusGeometry(0.3, 0.1, 30, 30);
const donutMaterial = new THREE.MeshPhysicalMaterial({ color: 0xFFA500 });
const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial);
donutMesh.position.set(-6, -1, -5);
scene.add(donutMesh);

function createStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  const z = -Math.random() * 500 - 50;
  star.position.set(x, y, z);
  scene.add(star);
}

for (let i = 0; i < 500; i++) {
  createStar();
}

const gltfLoader = new GLTFLoader();
async function loadModels() {
  const teapot = await gltfLoader.loadAsync('Teapot.gltf');
  teapot.scene.position.set(10, -15, -5);
  teapot.scene.scale.set(1, 1, 1);
  teapot.scene.rotation.set(35, 0, Math.PI / 4);
  scene.add(teapot.scene);

  const suzanne = await gltfLoader.loadAsync('Suzanne.glb');
  suzanne.scene.position.set(-11, -5, -5);
  suzanne.scene.scale.set(2, 2, 2);
  scene.add(suzanne.scene);
}
loadModels();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.y = t * 0.003;
  dirLight.position.copy(camera.position);
}
document.body.onscroll = moveCamera;

function rotateObjects() {
  heartMesh.rotation.x += 0.01;
  heartMesh.rotation.y += 0.01;
  verticalMesh.rotation.x += 0.01;
  verticalMesh.rotation.y += 0.01;
  donutMesh.rotation.x += 0.01;
  donutMesh.rotation.y += 0.01;
}

function animate() {
  requestAnimationFrame(animate);
  rotateObjects();
  effect.render(scene, camera);
}

window.addEventListener('resize', updateCanvasSize);
animate();
