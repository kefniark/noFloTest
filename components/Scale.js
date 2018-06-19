const noflo = require('noflo');

exports.getComponent = () => {
    const c = new noflo.Component();
    c.inPorts.add('in', { datatype: 'object' });
    c.inPorts.add('scale', { datatype: 'number' });
    c.outPorts.add('out', { datatype: 'object' });

    c.process((input, output) => {
        if (!input.hasData('in')) {
            return;
        }

        const obj = input.getData('in');
        const scale = input.getData('scale');
        //const before = JSON.stringify(obj);

        Fatina.tween(obj.scale)
            .to({
                x: scale,
                y: scale
            }, 600)
            .onComplete(() => output.sendDone(obj))
            .start();
    });

    return c;
};