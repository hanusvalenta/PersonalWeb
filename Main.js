import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Scene = new THREE.Scene();
const Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const Renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg')});
const MoonTexture = new THREE.TextureLoader().load('Moon.jpg');
const NormalTexture = new THREE.TextureLoader().load('Normal.jpg');
const Moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: MoonTexture,
    normalMap: NormalTexture,
  })
);
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);
const HanusTexture = new THREE.TextureLoader().load('Hanus.png');
const Hanus = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: HanusTexture }));
const spaceTexture = new THREE.TextureLoader().load('Space.jpg');

Renderer.setPixelRatio(window.devicePixelRatio);
Renderer.setSize(window.innerWidth, window.innerHeight);

Camera.position.setZ(30);
Camera.position.setX(-3);

Renderer.render(Scene, Camera);

Scene.add(torus);

pointLight.position.set(5, 5, 5);

Scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  Scene.add(star);
}

Array(200).fill().forEach(addStar);

Scene.background = spaceTexture;

Scene.add(Hanus);
Scene.add(Moon);

Moon.position.z = 30;
Moon.position.setX(-10);

Hanus.position.z = -5;
Hanus.position.x = 2;


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  Moon.rotation.x += 0.05;
  Moon.rotation.y += 0.075;
  Moon.rotation.z += 0.05;

  Hanus.rotation.y += 0.01;
  Hanus.rotation.z += 0.01;

  Camera.position.z = t * -0.01;
  Camera.position.x = t * -0.0002;
  Camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  Moon.rotation.x += 0.005;

  Renderer.render(Scene, Camera);
}

animate();