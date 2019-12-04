var renderer, camara, scene, controls;
var CUBELET_SIZE = 1, RUBIKS_DIM = 3;
var group;
var currentTime = Date.now(), duration = 30000, now, deltat, fract, angle;
var rubiksGroup = new THREE.Group(), frontGroup = new THREE.Group(), rightGroup = new THREE.Group(), upGroup = new THREE.Group(), downGroup = new THREE.Group(), leftGroup = new THREE.Group(), backGroup = new THREE.Group();
var fileNames;
var rubiksIsRotatingX = false, rubiksIsRotatingY = false, rubiksIsRotatingZ = false;
var rotationDirection = 'clockwise';

function createScene(canvas) {

    // We first declare the basics: renderer, camera and scene
    basicSceneSetup(canvas);

    // Configure the camera position, background, light and layout
    sceneConfiguration();

    // add event listeners for onKeyUp and onKeyDown
    addEventListeners();

    // Create the Rubik's Cube
    createRubiks();

    // test
    scene.add(new THREE.Mesh(new THREE.CubeGeometry(CUBELET_SIZE, CUBELET_SIZE, CUBELET_SIZE), new THREE.MeshBasicMaterial))

    // Add all groups to the scene
    scene.add(rubiksGroup);
}

function animate() {
    now = Date.now();
    deltat = now - currentTime;
    currentTime = now;
    fract = deltat / duration;
    angle = Math.PI * 2 * fract;
    if (rubiksIsRotatingX) { rotationDirection == 'clockwise' ? rubiksGroup.rotation.x += angle : rubiksGroup.rotation.x -= angle; }
}

function run() {
    requestAnimationFrame(run);
    renderer.render(scene, camera);
    // console.log(camera.position);
    animate();
}

function basicSceneSetup(canvas) {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', _ => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    scene = new THREE.Scene();
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    scene.add(camera);
}

function sceneConfiguration() {
    // Background Color
    scene.background = new THREE.Color(0x000000);
    // Camera position
    resetInitialCameraPosition();
    // controls.update(); // for orbit controller
    // Lighting
    var light = new THREE.AmbientLight();
    scene.add(light);
}

function createRubiks() {
    let materials = createMaterials();
    let cube = new Array();
    for (let z = 0; z < RUBIKS_DIM; z++) {
        cube[z] = new Array();
        for (let y = 0; y < RUBIKS_DIM; y++) {
            cube[z][y] = new Array();
            for (let x = 0; x < RUBIKS_DIM; x++) {
                cube[z][y][x] = new Array();
                cube[z][y][x] = new THREE.Mesh(
                    new THREE.CubeGeometry(CUBELET_SIZE, CUBELET_SIZE, CUBELET_SIZE),
                    materials[z][y][x]
                );
                cube[z][y][x].position.set(x * CUBELET_SIZE - 1, -y * CUBELET_SIZE + 1, -z * CUBELET_SIZE + 1);
                addCubeletToGroup(cube[z][y][x], x, y, z);
                rubiksGroup.add(cube[z][y][x]);
            }
        }
    }
    console.log('cube: ', cube);
}

function addCubeletToGroup(cubeletMesh, x, y, z) {
    console.log('pos should be: ', z + 1, y + 1, x - 1);
    if (z === 0) {
        if (y === 1 && x === 1) {
            console.log('found front pivot');
        }
        console.log('front cubelets: ', z, y, x);
    } else if (z === 1) {
        if (y === 1 && x === 1) {
            console.log('found unseen middle pivot');
        }
        console.log('middle cubelets: ', z, y, x);
    } else {
        if (y === 1 && x === 1) {
            console.log('found back pivot');
        }
        console.log('back cubelets: ', z, y, x);
    }
}

function resetInitialCameraPosition() {
    // camera.position.set(7, 6, 7);
    camera.position.set(0, 0, 10);
}

function onKeyDown(event) {
    switch (event.keyCode) {
        case 38: // Up
            console.log('pressed up');
            rubiksIsRotatingX = true;
            break;
        case 39: // Right
            break;
        case 37: // Left
            break;
        case 40: // Down
            break;
        case 87: // W
            break;
        case 65: // A
            break;
        case 83: // S
            break;
        case 68: // D
            break;
        case 32: // space
            break;
        default:
            break;
    }
}

function onKeyUp(event) {
    switch (event.keyCode) {
        case 38: // Up
            console.log('key up up');
            rubiksIsRotatingX = false;
            break;
        case 39: // Right
        case 37: // Left
        case 40: // Down
        case 87: // W
        case 65: // A
        case 83: // S
        case 68: // D
        default:
            break;
    }
}

function addEventListeners() {
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
}

function createMaterials() {
    fileNames = [
        [
            [
                ['black-face.png', 'white-face.png', 'red-face.png', 'black-face.png', 'blue-face.png', 'black-face.png'],
                ['black-face.png', 'black-face.png', 'red-face.png', 'black-face.png', 'blue-face.png', 'black-face.png'],
                ['yellow-face.png', 'black-face.png', 'red-face.png', 'black-face.png', 'blue-face.png', 'black-face.png']
            ],
            [
                ['black-face.png', 'white-face.png', 'black-face.png', 'black-face.png', 'blue-face.png', 'black-face.png'],
                ['black-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'blue-face.png', 'black-face.png'],
                ['yellow-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'blue-face.png', 'black-face.png']
            ],
            [
                ['black-face.png', 'white-face.png', 'black-face.png', 'brown-face.png', 'blue-face.png', 'black-face.png'],
                ['black-face.png', 'black-face.png', 'black-face.png', 'brown-face.png', 'blue-face.png', 'black-face.png'],
                ['yellow-face.png', 'black-face.png', 'black-face.png', 'brown-face.png', 'blue-face.png', 'black-face.png']
            ]
        ],
        [
            [
                ['black-face.png', 'white-face.png', 'red-face.png', 'black-face.png', 'black-face.png', 'black-face.png'],
                ['black-face.png', 'black-face.png', 'red-face.png', 'black-face.png', 'black-face.png', 'black-face.png'],
                ['yellow-face.png', 'black-face.png', 'red-face.png', 'black-face.png', 'black-face.png', 'black-face.png']
            ],
            [
                ['black-face.png', 'white-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'black-face.png'],
                ['black-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'black-face.png'],
                ['yellow-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'black-face.png']
            ],
            [
                ['black-face.png', 'white-face.png', 'black-face.png', 'brown-face.png', 'black-face.png', 'black-face.png'],
                ['black-face.png', 'black-face.png', 'black-face.png', 'brown-face.png', 'black-face.png', 'black-face.png'],
                ['yellow-face.png', 'black-face.png', 'black-face.png', 'brown-face.png', 'black-face.png', 'black-face.png']
            ]
        ],
        [
            [
                ['black-face.png', 'white-face.png', 'red-face.png', 'black-face.png', 'black-face.png', 'green-face.png'],
                ['black-face.png', 'black-face.png', 'red-face.png', 'black-face.png', 'black-face.png', 'green-face.png'],
                ['yellow-face.png', 'black-face.png', 'red-face.png', 'black-face.png', 'black-face.png', 'green-face.png']
            ],
            [
                ['black-face.png', 'white-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'green-face.png'],
                ['black-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'green-face.png'],
                ['yellow-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'black-face.png', 'green-face.png']
            ],
            [
                ['black-face.png', 'white-face.png', 'black-face.png', 'brown-face.png', 'black-face.png', 'green-face.png'],
                ['black-face.png', 'black-face.png', 'black-face.png', 'brown-face.png', 'black-face.png', 'green-face.png'],
                ['yellow-face.png', 'black-face.png', 'black-face.png', 'brown-face.png', 'black-face.png', 'green-face.png']
            ]
        ]
    ];

    let materials = new Array();
    for (let z = 0; z < RUBIKS_DIM; z++) {
        materials[z] = new Array();
        for (let y = 0; y < RUBIKS_DIM; y++) {
            materials[z][y] = new Array();
            for (let x = 0; x < RUBIKS_DIM; x++) {
                materials[z][y][x] = new Array();
                for (const fileName of fileNames[z][y][x]) {
                    let texture = new THREE.TextureLoader().load('images/' + fileName);
                    texture.minFilter = THREE.LinearFilter;
                    materials[z][y][x].push(
                        new THREE.MeshBasicMaterial({
                            map: texture
                        })
                    );
                }
            }
        }
    }
    return materials;
}