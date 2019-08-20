import { Clock } from 'three'

import { scene } from './scene'
import { renderer } from './renderer'
import { camera } from './camera'
import { player1, mixer } from './player1'
import { animateArrows } from './arrow'
import { players, animatePlayers } from './players';

var clock = new Clock()
document.body.appendChild( renderer.domElement )
var input = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    space: false
}

var state = "ready"

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
document.addEventListener('click', onClick);
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('pointerlockchange', onPointerLockChange)
window.addEventListener('resize', resize);

animate();

function animate() {
    requestAnimationFrame( animate );
    var delta = clock.getDelta();
    animateArrows(delta);
    if (player1 && mixer) {
        player1.animate(delta, input);
        mixer.update( delta );
    }
    if (Object.keys(players).length) {
        animatePlayers(delta)
    }
    renderer.render( scene, camera );
}

function toggleKey(event, toggle) {
    switch(event.key) {
        case 'w':
            input.forward = toggle;
            break;
        case 'a':
            input.left = toggle;
            break;
        case 's':
            input.backward = toggle;
            break;
        case 'd':
            input.right = toggle;
            break;
        case ' ':
            input.space = toggle;
            break;
    }
}
function onKeyDown(event) {
    toggleKey(event, true);
}
function onKeyUp(event) {
    toggleKey(event, false);
}

function onMouseDown() {
    if (state === "playing") {
        player1.onMouseDown()
    }
}
function onMouseUp() {
    if (state === "playing") {
        player1.onMouseUp()
    }
}


function onClick() {
    if (state !== "playing") {
        document.body.requestPointerLock();
        state = "playing"
    }
}

function onPointerLockChange() {
    if (!document.pointerLockElement) {
        state = "ready"
    }
}

function onMouseMove( event ) {
    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    camera.moveCamera(movementX, movementY);
}
function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

// create crosshair
var crosshairHtmlElement = document.createElement("div")
crosshairHtmlElement.setAttribute("style", "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; background-image: url(crosshair.svg);")
document.getElementsByTagName("BODY")[0].appendChild(crosshairHtmlElement)