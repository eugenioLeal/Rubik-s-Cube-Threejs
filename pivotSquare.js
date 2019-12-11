function getPivotSquareArrayHelper(pivot, zStart, zLimit, yStart, yLimit, xStart, xLimit) {
  let array = [];
  for(let z=zStart;z<zLimit;z++) {
    for(let y=yStart;y<yLimit;y++) {
      for(let x=xStart;x<xLimit;x++) {
        if (cube[z][y][x] !== pivot) array.push(cube[z][y][x]);
      }
    }
  }
  return array;
}
function getPivotSquareArray(face) {
  if(face === 'F') 
    return getPivotSquareArrayHelper(cube[0][1][1],0,1,0,RUBIKS_DIM,0,RUBIKS_DIM);
  if(face === 'U')
    return getPivotSquareArrayHelper(cube[1][0][1],0,RUBIKS_DIM,0,1,0,RUBIKS_DIM);
  if(face === 'L')
    return getPivotSquareArrayHelper(cube[1][1][0],0,RUBIKS_DIM,0,RUBIKS_DIM,0,1);
  if(face === 'R')
    return getPivotSquareArrayHelper(cube[1][1][2],0,RUBIKS_DIM,0,RUBIKS_DIM,2,3);
  if(face === 'D')
    return getPivotSquareArrayHelper(cube[1][2][1],0,RUBIKS_DIM,2,3,0,RUBIKS_DIM);
  if(face === 'B')
    return getPivotSquareArrayHelper(cube[2][1][1],2,3,0,RUBIKS_DIM,0,RUBIKS_DIM);
}