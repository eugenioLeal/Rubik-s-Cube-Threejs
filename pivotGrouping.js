
function addCubeletSquareFromPivotBackToScene(face) {
  if (face === 'F') {
    // console.log('pivot children: ',cube[0][1][1].children.length);
    // cube[0][1][1].children = [];
    // console.log('pivot children: ',cube[0][1][1].children.length);
    // console.log(cube[0][0][0].tempPosition);
    // for(let cubelet of getPivotSquareArray('F')) {
      // cubelet.position.z = cubelet.tempPosition;
    //   cubelet.position = cubelet.newPosition;
    //   scene.add(cubelet);
    // }
    // let children = cube[0][1][1].children.splice(0, cube[0][1][1].children.length);
    // console.log('old position: ', children[0].position);
    // children[0].position.set(-1,-1,1);
    // children[0].position.set(-1,-1,1);
    // children[0].rotation.z = children[0].rotation.z +Math.PI/2;
    // scene.add(children[0]);
    // for(let c of children) {
    //     scene.add(c);
    //     c.position.z = c.tempPosition;
    // }
  }
}

function addCubeletSquareToPivot(face) {
  if (face === 'F') {
    for(let cubelet of getPivotSquareArray('F')) {
      if(cubelet !== cube[0][1][1]) cube[0][1][1].add(cubelet);
      cube[0][1][1].position.z = 1;
      cubelet.tempPosition = cubelet.position.z;
      cubelet.position.z = 0;
    }
  }
  if(face === 'U') {
    for(let cubelet of getPivotSquareArray('U')) {
      if(cubelet !== cube[1][0][1]) cube[1][0][1].add(cubelet);
      cube[1][0][1].position.y = 1;
      cubelet.tempPosition = cubelet.position.y;
      cubelet.position.y = 0;
     }
  }
  if(face === 'L') {
    for(let cubelet of getPivotSquareArray('L')) {
      if(cubelet !== cube[1][1][0]) cube[1][1][0].add(cubelet);
      cube[1][1][0].position.x = -1;
      cubelet.tempPosition = cubelet.position.x;
      cubelet.position.x = 0;
    }
  }
  if(face === 'R') {
    for(let cubelet of getPivotSquareArray('R')) {
      if(cubelet !== cube[1][1][2]) cube[1][1][2].add(cubelet);
      cube[1][1][2].position.x = 1;
      cubelet.tempPosition = cubelet.position.x;
      cubelet.position.x = 0;
    }
  }
  if(face === 'D') {
    for(let cubelet of getPivotSquareArray('D')) {
      if(cubelet !== cube[1][2][1]) cube[1][2][1].add(cubelet);
      cube[1][2][1].position.y = -1;
      cubelet.tempPosition = cubelet.position.y;
      cubelet.position.y = 0;
    }
  }
  if(face === 'B') {
    for(let cubelet of getPivotSquareArray('B')) {
      if(cubelet !== cube[2][1][1]) cube[2][1][1].add(cubelet);
      cube[2][1][1].position.z = -1;
      cubelet.tempPosition = cubelet.position.z;
      cubelet.position.z = 0;
    }
  }
}