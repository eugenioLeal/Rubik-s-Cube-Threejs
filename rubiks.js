function createRubiks() {
    let materials = createMaterials();
    cube = new Array();
    for (let z = 0; z < RUBIKS_DIM; z++) {
        cube[z] = new Array();
        for (let y = 0; y < RUBIKS_DIM; y++) {
            cube[z][y] = new Array();
            for (let x = 0; x < RUBIKS_DIM; x++) {
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
}