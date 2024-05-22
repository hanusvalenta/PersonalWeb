import './Style.css';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const { Vector3 } = THREE;
const XAxis = new Vector3(1, 0, 0);
const YAxis = new Vector3(0, 1, 0);
const ZAxis = new Vector3(0, 0, 1);

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

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const gltfLoader = new GLTFLoader();
const objLoader = new OBJLoader();

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("display-canvas") });
renderer.setSize(window.innerWidth, window.innerHeight);

const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
effect.setSize(window.innerWidth, window.innerHeight);
effect.domElement.style.color = 'white';
effect.domElement.style.backgroundColor = 'black';

document.body.appendChild(effect.domElement);
document.body.removeChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);

scene.add(cube);
scene.add(dirLight);
scene.add(heartMesh);

async function loadModels() {
  const teapot = await gltfLoader.loadAsync('Teapot.gltf');
  teapot.scene.position.set(10, -15, -5);
  teapot.scene.scale.set(1, 1, 1);
  teapot.scene.rotation.set(35, 0, 135);
  scene.add(teapot.scene);

  const suzanne = await gltfLoader.loadAsync('Suzanne.glb');
  suzanne.scene.position.set(-11, -5, -5);
  suzanne.scene.scale.set(2, 2, 2);
  scene.add(suzanne.scene);
}
loadModels();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.y = t * 0.01;
  dirLight.position.copy(camera.position);
}
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    effect.render(scene, camera);
}
animate();
