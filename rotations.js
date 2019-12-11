function rotateFrontClockwise() {
  addCubeletSquareToPivot('F');
  startKeyFrameAnimator(cube[0][1][1], 200, 'z', true);
  setTimeout(_ => {
    // PROBANDO UNA ROTACION HARDCODEADA
    // cube[0][1][1].children = [];
    // cube[0][0][0].rotation.z = cube[0][1][1].rotation.z;
    // cube[0][0][0].position.set(cube[0][0][2].position.x,cube[0][0][2].position.y,1);
    // scene.add(cube[0][0][0]);
    // cube[0][0][1].rotation.z = cube[0][1][1].rotation.z;
    // cube[0][0][1].position.set(cube[0][1][2].position.x,cube[0][1][2].position.y,1);
    // scene.add(cube[0][0][1]);
    // cube[0][0][2].rotation.z = cube[0][1][1].rotation.z;
    // cube[0][0][2].position.set(cube[0][2][2].position.x,cube[0][2][2].position.y,1);
    // scene.add(cube[0][0][2]);
  }, 202);
  console.log('cubelet position: ',cube[0][0][0].position, ' correct position: ', cube[0][0][0]);
}

function rotateFrontCounterclockwise() {
  addCubeletSquareToPivot('F');
  startKeyFrameAnimator(cube[0][1][1], 200, 'z', false);
  setTimeout(_ => { console.log('animation done');}, 202);
}

function rotateRightClockwise() {
  addCubeletSquareToPivot('R');
  startKeyFrameAnimator(cube[1][1][2], 200, 'x', true);
  setTimeout(_ => { console.log('animation done');}, 202);
}

function rotateRightCounterclockwise() {
  addCubeletSquareToPivot('R');
  startKeyFrameAnimator(cube[1][1][2], 200, 'x', false);
  setTimeout(_ => { console.log('animation done');}, 202);
}

function rotateUpClockwise() {
  addCubeletSquareToPivot('U');
  startKeyFrameAnimator(cube[1][0][1], 200, 'y', true);
  setTimeout(_ => { console.log('animation done');}, 202);
}

function rotateUpCounterclockwise() {
  addCubeletSquareToPivot('U');
  startKeyFrameAnimator(cube[1][0][1], 200, 'y', false);
  setTimeout(_ => { console.log('animation done');}, 202);
}

function rotateDownClockwise() {
  addCubeletSquareToPivot('D');
  startKeyFrameAnimator(cube[1][2][1], 200, 'y', false);
  setTimeout(_ => { console.log('animation done');}, 202);
}

function rotateDownCounterclockwise() {
  addCubeletSquareToPivot('D');
  startKeyFrameAnimator(cube[1][2][1], 200, 'y', true);
  setTimeout(_ => { console.log('animation done');}, 202);
}

function rotateLeftClockwise() {
  addCubeletSquareToPivot('L');
  startKeyFrameAnimator(cube[1][1][0], 200, 'x', false);
  setTimeout(_ => { console.log('animation done');}, 202);
}

function rotateLeftCounterclockwise() {
  addCubeletSquareToPivot('L');
  startKeyFrameAnimator(cube[1][1][0], 200, 'x', true);
  setTimeout(_ => { console.log('animation done');}, 202);
}

function rotateBackClockwise() {
  addCubeletSquareToPivot('B');
  startKeyFrameAnimator(cube[2][1][1], 200, 'z', false);
  setTimeout(_ => { console.log('animation done');}, 202);
}

function rotateBackCounterclockwise() {
  addCubeletSquareToPivot('B');
  startKeyFrameAnimator(cube[2][1][1], 200, 'z', true);
  setTimeout(_ => { console.log('animation done');}, 202);
}