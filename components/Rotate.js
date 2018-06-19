const noflo = require('noflo');

exports.getComponent = () => {
    const c = new noflo.Component();
    c.inPorts.add('in', { datatype: 'object' });
    c.inPorts.add('angle', { datatype: 'number' });
    c.outPorts.add('out', { datatype: 'object' });

    c.process((input, output) => {
        if (!input.hasData('in')) {
            return;
        }

        const obj = input.getData('in');
        const angle = input.getData('angle');
        //const before = JSON.stringify(obj);

        Fatina.tween(obj)
            .to({
                rotation: obj.rotation + angle
            }, 300)
            .onComplete(() => output.sendDone(obj))
            .start();
    });

    return c;
};