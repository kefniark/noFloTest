const fs = require("fs");

var fbpGraph = window.TheGraph.fbpGraph;

// Remove loading message
document.body.removeChild(document.getElementById("loading"));

// The graph editor
var editor = document.getElementById('editor');

function deleteNode(graph, itemKey, item) {
    graph.removeNode(itemKey);
}
function deleteEdge(graph, itemKey, item) {
  graph.removeEdge(item.from.node, item.from.port, item.to.node, item.to.port);
}

var contextMenus = {
    main: null,
    selection: null,
    nodeInport: null,
    nodeOutport: null,
    graphInport: null,
    graphOutport: null,
    edge: {
      icon: "long-arrow-right",
      s4: {
        icon: "trash-o",
        iconLabel: "delete",
        action: deleteEdge
      }
    },
    node: {
      s4: {
        icon: "trash-o",
        iconLabel: "delete",
        action: deleteNode
      },
    },
    group: {
      icon: "th",
      s4: {
        icon: "trash-o",
        iconLabel: "ungroup",
        action: function (graph, itemKey, item) {
          graph.removeGroup(itemKey);
        },
      },
    },
  };

// Component library
var library = {
    basic: {
        name: 'basic',
        description: 'basic demo component',
        icon: 'eye',
        inports: [
            { 'name': 'in0', 'type': 'all' },
            { 'name': 'in1', 'type': 'all' },
            { 'name': 'in2', 'type': 'all' }
        ],
        outports: [
            { 'name': 'out', 'type': 'all' }
        ]
    },
    tall: {
        name: 'tall',
        description: 'tall demo component',
        icon: 'cog',
        inports: [
            { 'name': 'in0', 'type': 'all' },
            { 'name': 'in1', 'type': 'all' },
            { 'name': 'in2', 'type': 'all' },
            { 'name': 'in3', 'type': 'all' },
            { 'name': 'in4', 'type': 'all' },
            { 'name': 'in5', 'type': 'all' },
            { 'name': 'in6', 'type': 'all' },
            { 'name': 'in7', 'type': 'all' },
            { 'name': 'in8', 'type': 'all' },
            { 'name': 'in9', 'type': 'all' },
            { 'name': 'in10', 'type': 'all' },
            { 'name': 'in11', 'type': 'all' },
            { 'name': 'in12', 'type': 'all' }
        ],
        outports: [
            { 'name': 'out0', 'type': 'all' }
        ]
    }
};

// Load empty graph
var graph = new fbpGraph.Graph();

function renderEditor() {
    var props = {
        readonly: false,
        height: window.innerHeight,
        width: window.innerWidth,
        graph: graph,
        menus: contextMenus,
        library: library,
    };
    //console.log('render', props);
    var editor = document.getElementById('editor');
    editor.width = props.width;
    editor.height = props.height;
    var element = React.createElement(TheGraph.App, props);
    ReactDOM.render(element, editor);
}
graph.on('endTransaction', renderEditor); // graph changed
window.addEventListener("resize", renderEditor);

// Add node button
var addnode = function (component) {
    var id = Math.round(Math.random() * 100000).toString(36);
    var metadata = {
        label: component,
        x: Math.round(Math.random() * 800),
        y: Math.round(Math.random() * 600)
    };
    var newNode = graph.addNode(id, component, metadata);
    return newNode;
};
document.getElementById("addmovenode").addEventListener("click", () => addnode("Move"));
document.getElementById("addshownode").addEventListener("click", () => addnode("Show"));
document.getElementById("addrotatenode").addEventListener("click", () => addnode("Rotate"));
document.getElementById("addscalenode").addEventListener("click", () => addnode("Scale"));

// Random graph button
document.getElementById("random").addEventListener("click", function () {
    graph.startTransaction('randomgraph');
    for (var i = 0; i < 20; i++) {
        var node = addnode();
        addedge(node.id);
        addedge(node.id);
    }
    graph.endTransaction('randomgraph');
});

// Get graph button
document.getElementById("get").addEventListener("click", function () {
    var graphJSON = JSON.stringify(graph.toJSON(), null, 2);
    alert(graphJSON);
    //you can use the var graphJSON to save the graph definition in a file/database
});

document.getElementById("save").addEventListener("click", function () {
    var graphJSON = JSON.stringify(graph.toJSON(), null, 2);
    fs.writeFileSync('graphs/animationGraph.json', graphJSON);
    //you can use the var graphJSON to save the graph definition in a file/database
});

// Clear button
document.getElementById("clear").addEventListener("click", function () {
    graph = new fbpGraph.Graph();
    loadGraph();

});

var data = fs.readFileSync('graphs/animationGraph.json');
var parsed = JSON.parse(data.toString());
console.log(parsed);

function loadGraph() {
    fbpGraph.graph.loadJSON(parsed, function (err, g) {
        if (err) {
            loadingMessage.innerHTML = "error loading graph: " + err.toString();
            return;
        }
        // Synthesize component library from graph
        library = TheGraph.library.libraryFromGraph(g);
        // Set loaded graph
        graph = g;
        graph.on('endTransaction', renderEditor); // graph changed

        renderEditor();
    });
}
loadGraph();