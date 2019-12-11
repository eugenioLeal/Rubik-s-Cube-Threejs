function onKeyDown(event) {
    switch (event.keyCode) {
        case 70: // F
            event.shiftKey ? rotateFrontCounterclockwise() : rotateFrontClockwise();
            break;
        case 82: // R
            event.shiftKey ? rotateRightCounterclockwise() : rotateRightClockwise();
            break;
        case 85: // U
            event.shiftKey ? rotateUpCounterclockwise() : rotateUpClockwise();
            break;
        case 68: // D
            event.shiftKey ? rotateDownCounterclockwise() : rotateDownClockwise();
            break;
        case 76: // L
            event.shiftKey ? rotateLeftCounterclockwise() : rotateLeftClockwise();
            break;
        case 66: // B
            event.shiftKey ? rotateBackCounterclockwise() : rotateBackClockwise();
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
        default:
            break;
    }
}

function addEventListeners() {
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
}