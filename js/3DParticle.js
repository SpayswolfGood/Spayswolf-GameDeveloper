//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'eye';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `models/${objToRender}/scene.glb`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
    animate();
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "eye" ? 5 : 500;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(5, 5, 5) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "eye" ? 5 : 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xf80000, 2, 100);
pointLight.position.set(15, 0, 2);
scene.add(pointLight);

const pointLight1 = new THREE.PointLight(0x5555ff, 2, 100);
pointLight1.position.set(-15, 0, 2);
scene.add(pointLight1);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
//if (objToRender === "eye") {
//  controls = new OrbitControls(camera, renderer.domElement);
//}

//Render the scene
function animate() {
  requestAnimationFrame(animate);

     object.rotation.y = (1 + mouseX / window.innerWidth * -1) + 2.55;
     object.rotation.x = 0.5 + mouseY * -1 / window.innerHeight;

  renderer.render(scene, camera);
}

// Вызываем функцию для обновления позиции камеры
//updateCameraPosition();

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Start the 3D rendering
//animate();

//Parolax
const container = document.getElementById('container'); // Замените 'container' на id вашего контейнера
const objects = container.querySelectorAll('.circle'); // Замените 'object' на класс ваших объектов

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    objects.forEach(object => {
        const parallaxSpeedX = object.dataset.parallaxSpeedX || 1; // Скорость параллакса по оси X
        const parallaxSpeedY = object.dataset.parallaxSpeedY || 1; // Скорость параллакса по оси Y
        const translateX = (mouseX - window.innerWidth / 2) * parallaxSpeedX / 20; // Вычисляем смещение по X
        const translateY = (mouseY - window.innerHeight / 2) * parallaxSpeedY / 20; // Вычисляем смещение по Y
        object.style.transform = `translate(${translateX}px, ${translateY}px)`; // Применяем смещение
    });
});