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