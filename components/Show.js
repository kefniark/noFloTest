const noflo = require('noflo');

exports.getComponent = () => {
    const c = new noflo.Component();
    c.inPorts.add('in', { datatype: 'object' });
    c.inPorts.add('display', { datatype: 'boolean' });
    c.outPorts.add('out', { datatype: 'object' });

    c.process((input, output) => {
        if (!input.hasData('in')) {
            return;
        }

        const obj = input.getData('in');
        const display = input.getData('display');

        obj.visible = display;
        setTimeout(() => {
            output.sendDone(object);
        }, 100);
    });
    return c;
};