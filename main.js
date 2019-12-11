var renderer, camara, scene, controls;
var CUBELET_SIZE = 1, RUBIKS_DIM = 3;
var currentTime = Date.now(), duration = 30000, 
    now, deltat, fract, angle;
var rubiksGroup = new THREE.Group();
var fileNames;
var rotationDirection = 'clockwise';
var cube;
var animator;

function createScene(canvas) {
    // We first declare the basics: renderer, camera and scene
    basicSceneSetup(canvas);
    // Configure the camera position, background, light and layout
    sceneConfiguration();
    // add event listeners for onKeyUp and onKeyDown
    addEventListeners();
    // Create the Rubik's Cube
    createRubiks();
}

function animate() {
    now = Date.now();
    deltat = now - currentTime;
    currentTime = now;
    fract = deltat / duration;
    angle = Math.PI * 2 * fract;
}

function run() {
    requestAnimationFrame(run);
    renderer.render(scene, camera);
    KF.update();
    animate();
}