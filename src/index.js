const nofloLib = require("noflo");

function AddSprite(path, container, x, y, scale) {
    var img = PIXI.Sprite.fromImage(path);
    img.anchor.set(0.5);
    img.x = x;
    img.y = y;
    img.scale.x = scale;
    img.scale.y = scale;
    container.addChild(img);
    return img;
}

// Create Pixi.js scene
var app = new PIXI.Application(640, 480, {backgroundColor : 0x000000});
document.getElementById('canvas').appendChild(app.view);

var star = new PIXI.Container();
app.stage.addChild(star);

AddSprite("assets/background.jpg", star, 320, 240, 0.7);

const ball = AddSprite("assets/Ball.png", star, 320, 240, 1);

window.sprite = ball;
window.noFlo = nofloLib;

// Play component
const wrappedComponent = nofloLib.asCallback('Show', { baseDir: './' });
// console.log("Play Component", wrappedComponent);
// wrappedComponent({ in: 'Nano' }, (err, result) => {
//     if (err) { throw err; }

//     console.log("Result Component", result.out);
// });

// Play Graph
const wrappedDynGraph = nofloLib.asCallback('animationGraph', { baseDir: './' });
console.log("Play Graph", wrappedDynGraph);

// const obj = {
//     position: {x: 0, y: 0},
//     visible: false
// };


// Create graph animation
// const graph = nofloLib.graph.createGraph("animation");

// create nodes
// graph.addNode("Appear", "Show");
// graph.addNode("MoveRight", "Move");
// graph.addNode("Rotate", "Rotate");
// graph.addNode("ScaleIn", "Scale");
// graph.addNode("ScaleOut", "Scale");
// graph.addNode("MoveLeft", "Move");
// graph.addNode("Disappear", "Show");

// // connect nodes
// graph.addEdge("Appear", "out", "MoveRight", "in");
// graph.addEdge("MoveRight", "out", "MoveLeft", "in");
// graph.addEdge("MoveRight", "out", "Rotate", "in");
// graph.addEdge("MoveLeft", "out", "ScaleIn", "in");
// graph.addEdge("ScaleIn", "out", "ScaleOut", "in");
// graph.addEdge("ScaleOut", "out", "Disappear", "in");

// // add initial value
// graph.addInport('in', 'Appear', 'in');
// graph.addOutport('out', 'Disappear', 'out');

// // set some hardcoded value
// graph.addInitial(true, "Appear", "display");
// graph.addInitial({ x: 180, y: 10 }, "MoveRight", "position");
// graph.addInitial({ x: -220, y: -30 }, "MoveLeft", "position");
// graph.addInitial(90, "Rotate", "angle");
// graph.addInitial(5, "ScaleIn", "scale");
// graph.addInitial(1, "ScaleOut", "scale");
// graph.addInitial(false, "Disappear", "display");

// window.graph = graph;
// const wrappedDynGraph = nofloLib.asCallback(graph);


console.log("Play Dynamic Graph", wrappedDynGraph);

//

window.PlayGraph = function () {
    wrappedDynGraph({ in: ball }, (err, result) => {
        if (err) { throw err; }
    
        console.log("Result Component", result.out);
    });
}

window.PlayShow = function (visible) {
    console.log("playShow", ball, visible);
    wrappedComponent({ in: ball, display: visible }, (err, result) => {
        if (err) { throw err; }
    
        console.log("Result Component", result.out);
    });
}