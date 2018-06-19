const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.inPorts.add('in', { datatype: 'string' });
  c.outPorts.add('out', { datatype: 'string' });

  c.process((input, output) => {
    if (!input.hasData('in')) {
      return;
    }

    const data = input.getData('in');
    if (data) {
      output.sendDone("Hello " + data + "!");
      return;
    }
    output.sendDone("Hello unknown :D");
  });
  return c;
};