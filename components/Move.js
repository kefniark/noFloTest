const noflo = require('noflo');

exports.getComponent = () => {
    const c = new noflo.Component();
    c.inPorts.add('in', { datatype: 'object' });
    c.inPorts.add('position', { datatype: 'object' });
    c.outPorts.add('out', { datatype: 'object' });

    c.process((input, output) => {
        if (!input.hasData('in')) {
            return;
        }

        const obj = input.getData('in');
        const position = input.getData('position');

        if (object.position && position.x) {
            object.position.x += position.x;
        }
        if (object.position && position.y) {
            object.position.y += position.y;
        }

        setTimeout(() => {
            output.sendDone(object);
        }, 100);
    });
    
    return c;
};