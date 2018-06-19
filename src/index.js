export default function Init() {
    console.log("Init");
}

const nofloLib = require("noflo");

// Play component
const wrappedComponent = nofloLib.asCallback('Hello', { baseDir: './' });
console.log("Play Component", wrappedComponent);
wrappedComponent({ in: 'Nano' }, (err, result) => {
    if (err) { throw err; }

    console.log("Result Component", result.out);
});

// Play Graph
const wrappedGraph = nofloLib.asCallback('MyObject', { baseDir: './' });
console.log("Play Graph", wrappedGraph);

const obj = {
    position: {x: 0, y: 0},
    visible: true
};

wrappedGraph({ in: obj }, (err, result) => {
    if (err) { throw err; }

    console.log("Result Component", result.out);
});