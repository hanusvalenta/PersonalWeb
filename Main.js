import './style.css';
import * as THREE from 'three';

const Scene = new THREE.Scene();
const Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const Renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});
const PointLight = new THREE.PointLight(0xffffff);
const AmbientLight = new THREE.AmbientLight(0xffffff);
const Crater = new THREE.TextureLoader().load('GaleCrater.png');

Renderer.setPixelRatio(window.devicePixelRatio);
Renderer.setSize(window.innerWidth, window.innerHeight);

Camera.position.setZ(30);
Camera.position.setX(-3);

PointLight.position.set(5, 5, 5);

Scene.add(PointLight, AmbientLight);

Scene.background = Crater;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  Camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;
moveCamera();

function RenderLoop() {
  requestAnimationFrame(RenderLoop);

  Renderer.render(Scene, Camera);
}

RenderLoop();