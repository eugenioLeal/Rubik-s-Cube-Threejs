function startKeyFrameAnimator(pivot, duration, axis_of_rotation, rotationBool) {
  if(axis_of_rotation === 'x') {
    animator = new KF.KeyFrameAnimator;
    animator.init({ 
      interps: [{ keys:[0, 1], 
        values:[{ x: pivot.rotation.x }, 
        { x: rotationBool ? pivot.rotation.x-Math.PI/2 : pivot.rotation.x+Math.PI/2 }],
        target: pivot.rotation }],
        loop: false,
        duration: duration });
    animator.start();
  }
  if(axis_of_rotation === 'y') {
    animator = new KF.KeyFrameAnimator;
    animator.init({ 
      interps: [{ keys:[0, 1], 
        values:[{ y: pivot.rotation.y }, 
        { y: rotationBool ? pivot.rotation.y-Math.PI/2 : pivot.rotation.y+Math.PI/2 }],
        target: pivot.rotation }],
        loop: false,
        duration: duration });
    animator.start();
  }
  if(axis_of_rotation === 'z') {
    animator = new KF.KeyFrameAnimator;
    animator.init({ 
      interps: [{ keys:[0, 1], 
        values:[{ z: pivot.rotation.z }, 
        { z: rotationBool ? pivot.rotation.z-Math.PI/2 : pivot.rotation.z+Math.PI/2 }],
        target: pivot.rotation }],
        loop: false,
        duration: duration });
    animator.start();
  }
}