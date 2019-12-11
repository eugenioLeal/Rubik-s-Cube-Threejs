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