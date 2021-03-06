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
        //const before = JSON.stringify(obj);

        Fatina.tween(obj)
            .to({
                x: obj.x + position.x,
                y: obj.y + position.y
            }, 300)
            .onComplete(() => output.sendDone(obj))
            .start();
    });

    return c;
};