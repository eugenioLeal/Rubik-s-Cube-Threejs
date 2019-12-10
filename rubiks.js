var renderer, camara, scene, controls;
var CUBELET_SIZE = 1, RUBIKS_DIM = 3;
var currentTime = Date.now(), duration = 30000, 
    now, deltat, fract, angle;
var dynamicGroup = new THREE.Group(), rubiksGroup = new THREE.Group();
var fileNames;
var rubiksIsRotatingX = false, rubiksIsRotatingY = false, rubiksIsRotatingZ = false;
var frontRotating = false;
var rotationDirection = 'clockwise';
var cube, pivot = new THREE.Group();
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

function createRubiks() {
    let materials = createMaterials();
    cube = new Array();
    for (let z = 0; z < RUBIKS_DIM; z++) {
        cube[z] = new Array();
        for (let y = 0; y < RUBIKS_DIM; y++) {
            cube[z][y] = new Array();
            for (let x = 0; x < RUBIKS_DIM; x++) {
                //cube[z][y][x] = new Array();
                cube[z][y][x] = new THREE.Mesh(
                    new THREE.CubeGeometry(CUBELET_SIZE, CUBELET_SIZE, CUBELET_SIZE),
                    materials[z][y][x]
                );
                cube[z][y][x].position.set(
                    x * CUBELET_SIZE - 1, 
                    -y * CUBELET_SIZE + 1, 
                    -z * CUBELET_SIZE + 1
                );
                scene.add(cube[z][y][x]);              
            }
        }
    }
    //scene.add(rubiksGroup);
}

function addCubeletsToPivot(face) {
   console.log('normally 27: ',rubiksGroup.children.length);
   console.log('all children 27: ',rubiksGroup.children);
   if (face === 'F') {
       for(let y of cube[0]) {
           for(let x of y) {
               if(x !== cube[0][1][1]) {
                   cube[0][1][1].add(x);
               };
               cube[0][1][1].position.z = 1;
               x.temp = x.position.z;
               x.position.z = 0;
           }
       }
   }
   if( face === 'U') {
       cube[1][0][1].add(cube[0][0][0]);
       cube[1][0][1].add(cube[0][0][1]);001
       cube[1][0][1].add(cube[0][0][2]);002
       cube[1][0][1].add(cube[1][0][0]);100
       cube[1][0][1].add(cube[1][0][2]);102
       cube[1][0][1].add(cube[2][0][0]);200
       cube[1][0][1].add(cube[2][0][1]);201
       cube[1][0][1].add(cube[2][0][2]);202/*
       cube[1][0][1].position.y = 1;//pivot
       cube[0][0][0].position.y = 0;
       cube[0][0][1].position.y = 0;
       cube[0][0][2].position.y = 0;
       cube[1][0][0].position.y = 0;
       cube[1][0][2].position.y = 0;
       cube[2][0][0].position.y = 0;
       cube[2][0][1].position.y = 0;
       cube[2][0][2].position.y = 0;*/
   }
   console.log('normally 27: ',rubiksGroup.children.length);
}

function addCubeletsToRubiksGroup(face) {
    if (face === 'F') {
      //  console.log('front children: PRUEBA ', cube[0][1][1].children);
      // console.log(cube[0]);
       // cube[0][1][1].children = [];
   //     // if(cube[0][1][1].children === cube[0][1][1].children.splice(0, cube[0][1][1].children.length)){
   //     //     console.log('pasado eeee')};
       let children = cube[0][1][1].children.splice(0, cube[0][1][1].children.length);
       console.log('front children: SPLICE ',children);
       // children[0].position.set(-1,-1,1);
       // children[0].position.set(-1,-1,1);
       // children[0].rotation.z = children[0].rotation.z +Math.PI/2;
       // scene.add(children[0]);
       for(let c of children) {
           // c.position.z = -1;
           console.log('front children pos', c.position);
           scene.add(c);
           c.position.z = c.temp;
           // c.position.y = 4;
       }

   //     // scene.add(rubiksGroup);
       // console.log('normally 27: ',rubiksGroup.children);
       console.log(cube);
   //     console.log('front children: ', cube[0][1][1].children.length);
   // }
   // for(let z of cube) {
   //     for (let y of z) {
   //         for(let x of y) scene.add(x);
   //     }
   }
}

function rotateFrontClockwise() {
    addCubeletsToPivot('F');
    animator = new KF.KeyFrameAnimator;
    animator.init({ 
        interps:
            [
                { 
                    keys:[0, 1], 
                    values:[{ z: cube[0][1][1].rotation.z }, { z: cube[0][1][1].rotation.z+Math.PI/2 }],
                    target:cube[0][1][1].rotation
                }
            ],
        loop: false,
        duration: 1000,
    });
    animator.start();
    setTimeout(_ => {

        addCubeletsToRubiksGroup('F');
    //     console.log('CUBBBE LENGTH', );
        // 1 2 3    7 4 1
        // 4 5 6    8 5 2
        // 7 8 9    9 6 3
        let seven = cube[0][2][0];
        let one = cube[0][0][0];
        cube[0][0][0] = seven;
        let three = cube[0][0][2];
        cube[0][0][2] = one;
        let nine = cube[0][2][2];
        cube[0][2][2] = three;
        cube[0][2][0] = nine;
        let four = cube[0][1][0];
        let two = cube[0][0][1];
        cube[0][0][1] = four;
        let six = cube[0][1][2];
        cube[0][1][2] = two;
        let eight = cube[0][2][1];
        cube[0][2][1] = six;
        cube[0][1][0] = eight;
        // scene.remove(cube[0][1][1]);
        // createRubiks();
    }, 1000);
}

function rotateFrontCounterclockwise() {
    // 1 2 3    3 6 9
    // 4 5 6    2 5 8
    // 7 8 9    1 4 7
    let three = cube[0][0][2];
    let one = cube[0][0][0];
    cube[0][0][0] = three;
    let seven = cube[0][2][0];
    cube[0][2][0] = one;
    let nine = cube[0][2][2];
    cube[0][2][2] = seven;
    cube[0][0][2] = nine;
    let six = cube[0][1][2];
    let two = cube[0][0][1];
    cube[0][0][1] = six;
    let four = cube[0][1][0];
    cube[0][1][0] = two;
    let eight = cube[0][2][1];
    cube[0][2][1] = four;
    cube[0][1][2] = eight;
}

function rotateRightClockwise() {
    // 3 12 21    9   6  3
    // 6 15 24    18 15 12
    // 9 18 27    27 24 21
    let nine = cube[0][2][2];
    let three = cube[0][0][2];
    cube[0][0][2] = nine;
    let twentyone = cube[2][0][2];
    cube[2][0][2] = three;
    let twentyseven = cube[2][2][2];
    cube[2][2][2] = twentyone;
    cube[0][2][2] = twentyseven;
    let six = cube[0][1][2];
    let twelve = cube[1][0][2];
    cube[1][0][2] = six;
    let twentyfour = cube[2][1][2];
    cube[2][1][2] = twelve;
    let eighteen = cube[1][2][2];
    cube[1][2][2] = twentyfour;
    cube[0][1][2] = eighteen;
}

function rotateRightCounterclockwise() {
    // 3 12 21    21 24 27
    // 6 15 24    12 15 18
    // 9 18 27     3  6  9
    let twentyone = cube[2][0][2];
    let three = cube[0][0][2];
    cube[0][0][2] = twentyone;
    let nine = cube[0][2][2];
    cube[0][2][2] = three;
    let twentyseven = cube[2][2][2];
    cube[2][2][2] = nine;
    cube[2][0][2] = twentyseven;
    let twentyfour = cube[2][1][2];
    let twelve = cube[1][0][2];
    cube[1][0][2] = twentyfour;
    let six = cube[0][1][2];
    cube[0][1][2] = twelve;
    let eighteen = cube[1][2][2];
    cube[1][2][2] = six;
    cube[2][1][2] = eighteen;
}

function rotateUpClockwise() {
    addCubeletsToPivot('U');
    animator = new KF.KeyFrameAnimator;
    animator.init({ 
        interps:
            [
                { 
                    keys:[0, 1], 
                    values:[{ y: cube[1][0][1].rotation.y }, { y: cube[1][0][1].rotation.y+Math.PI/2 }],
                    target:cube[1][0][1].rotation
                }
            ],
        loop: false,
        duration: 1000,
    });
    animator.start();
    // 19 20 21    1 10 19
    // 10 11 12    2 11 20
    //  1  2  3    3 12 21
    let one = cube[0][0][0];
    let nineteen = cube[2][0][0];
    cube[2][0][0] = one;
    let twentyone = cube[2][0][2];
    cube[2][0][2] = nineteen;
    let three = cube[0][0][2];
    cube[0][0][2] = twentyone;
    cube[0][0][0] = three;
    let ten = cube[1][0][0];
    let twenty = cube[2][0][1];
    cube[2][0][1] = ten;
    let twelve = cube[1][0][2];
    cube[1][0][2] = twenty;
    let two = cube[0][0][1];
    cube[0][0][1] = twelve;
    cube[1][0][0] = two;
}

function rotateUpCounterclockwise() {
    // 19 20 21    21 12 3
    // 10 11 12    20 11 2
    //  1  2  3    19 10 1
    let twentyone = cube[2][0][2];
    let nineteen = cube[2][0][0];
    cube[2][0][0] = twentyone;
    let one = cube[0][0][0];
    cube[0][0][0] = nineteen;
    let three = cube[0][0][2];
    cube[0][0][2] = one;
    cube[2][0][2] = three;
    let twelve = cube[1][0][2];
    let twenty = cube[2][0][1];
    cube[2][0][1] = twelve;
    let ten = cube[1][0][0];
    cube[1][0][0] = twenty;
    let two = cube[0][0][1];
    cube[0][0][1] = ten;
    cube[1][0][2] = two;
}

function rotateDownClockwise() {
    //  7  8  9    25 16 7
    // 16 17 18    26 17 8
    // 25 26 27    27 18 9
    let twentyfive = cube[2][2][0];
    let seven = cube[0][2][0];
    cube[0][2][0] = twentyfive;
    let nine = cube[0][2][2];
    cube[0][2][2] = seven;
    let twentyseven = cube[2][2][2];
    cube[2][2][2] = nine;
    cube[2][2][0] = twentyseven;
    let sixteen = cube[1][2][0];
    let eight = cube[0][2][1];
    cube[0][2][1] = sixteen;
    let eighteen = cube[1][2][2];
    cube[1][2][2] = eight;
    let twentysix = cube[2][2][1];
    cube[2][2][1] = eighteen;
    cube[1][2][0] = twentysix;
}

function rotateDownCounterclockwise() {
    //  7  8  9   9 18 27
    // 16 17 18   8 17 26
    // 25 26 27   7 16 25
    let nine = cube[0][2][2];
    let seven = cube[0][2][0];
    cube[0][2][0] = nine;
    let twentyfive = cube[2][2][0];
    cube[2][2][0] = seven;
    let twentyseven = cube[2][2][2];
    cube[2][2][2] = twentyfive;
    cube[0][2][2] = twentyseven;
    let eighteen = cube[1][2][2];
    let eight = cube[0][2][1];
    cube[0][2][1] = eighteen;
    let sixteen = cube[1][2][0];
    cube[1][2][0] = eight;
    let twentysix = cube[2][2][1];
    cube[2][2][1] = sixteen;
    cube[1][2][2] = twentysix;
}

function rotateLeftClockwise() {
    // 1 10 19     7  4  1
    // 4 13 22    16 13 10
    // 7 16 25    25 22 19
    let seven = cube[0][2][0];
    let one = cube[0][0][0];
    cube[0][0][0] = seven;
    let nineteen = cube[2][0][0];
    cube[2][0][0] = one;
    let twentyfive = cube[2][2][0];
    cube[2][2][0] = nineteen;
    cube[0][2][0] = twentyfive;
    let four = cube[0][1][0];
    let ten = cube[1][0][0];
    cube[1][0][0] = four;
    let twentytwo = cube[2][1][0];
    cube[2][1][0] = ten;
    let sixteen = cube[1][2][0];
    cube[1][2][0] = twentytwo;
    cube[0][1][0] = sixteen;
}

function rotateLeftCounterclockwise() {
    // 1 10 19    19 22 25
    // 4 13 22    10 13 16
    // 7 16 25     1  4  7
    let nineteen = cube[2][0][0];
    let one = cube[0][0][0];
    cube[0][0][0] = nineteen;
    let seven = cube[0][2][0];
    cube[0][2][0] = one;
    let twentyfive = cube[2][2][0];
    cube[2][2][0] = seven;
    cube[2][0][0] = twentyfive;
    let twentytwo = cube[2][1][0];
    let ten = cube[1][0][0];
    cube[1][0][0] = twentytwo;
    let four = cube[0][1][0];
    cube[0][1][0] = ten;
    let sixteen = cube[1][2][0];
    cube[1][2][0] = four;
    cube[2][1][0] = sixteen;
}

function rotateBackClockwise() {
    // 19 20 21    25 22 19
    // 22 23 24    26 23 20
    // 25 26 27    27 24 21
    let twentyfive = cube[2][2][0];
    let nineteen = cube[2][0][0];
    cube[2][0][0] = twentyfive;
    let twentyone = cube[2][0][2];
    cube[2][0][2] = nineteen;
    let twentyseven = cube[2][2][2];
    cube[2][2][2] = twentyone;
    cube[2][2][0] = twentyseven;
    let twentytwo = cube[2][1][0];
    let twenty = cube[2][0][1];
    cube[2][0][1] = twentytwo;
    let twentyfour = cube[2][1][2];
    cube[2][1][2] = twenty;
    let twentysix = cube[2][2][1];
    cube[2][2][1] = twentyfour;
    cube[2][1][0] = twentysix;
}

function rotateBackCounterclockwise() {
    // 19 20 21    21 24 27
    // 22 23 24    20 23 26
    // 25 26 27    19 22 25
    let twentyone = cube[2][0][2];
    let nineteen = cube[2][0][0];
    cube[2][0][0] = twentyone;
    let twentyfive = cube[2][2][0];
    cube[2][2][0] = nineteen;
    let twentyseven = cube[2][2][2];
    cube[2][2][2] = twentyfive;
    cube[2][0][2] = twentyseven;
    let twentyfour = cube[2][1][2];
    let twenty = cube[2][0][1];
    cube[2][0][1] = twentyfour;
    let twentytwo = cube[2][1][0];
    cube[2][1][0] = twenty;
    let twentysix = cube[2][2][1];
    cube[2][2][1] = twentytwo;
    cube[2][1][2] = twentysix;
}

function onKeyDown(event) {
    switch (event.keyCode) {
        case 38: // Up
            console.log('pressed up');
            // rubiksIsRotatingX = true;
            break;
        case 39: // Right
            break;
        case 37: // Left
            break;
        case 40: // Down
            break;
        case 70: // F
            event.shiftKey ? rotateFrontCounterclockwise() : rotateFrontClockwise();
            break;
        case 85: // U
            event.shiftKey ? rotateUpCounterclockwise() : rotateUpClockwise();
        case 87: // W
            console.log('a double-u');
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

function run() {
    requestAnimationFrame(run);
    renderer.render(scene, camera);
    KF.update();
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
    camera = new THREE.PerspectiveCamera(
        45, 
        window.innerWidth / window.innerHeight, 
        1, 
        1000
    );
    scene = new THREE.Scene();
    console.log('scene: ',scene);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    scene.add(camera);
}

function sceneConfiguration() {
    // Background Color
    scene.background = new THREE.Color(0x555555);
    // Camera position
    resetInitialCameraPosition();
    controls.update(); // for orbit controller
    // Lighting
    var light = new THREE.AmbientLight();
    scene.add(light);
}

function resetInitialCameraPosition() {
    // camera.position.set(7, 6, 7);
    camera.position.set(0, 0, 10);
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

