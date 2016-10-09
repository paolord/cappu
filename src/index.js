'use strict';

const spawn = require('child_process').spawn;
const growl = require('growl');
// const parser = require('./parser/mocha');

exports.cappu = (options) => {
  const main = options.cmd;
  const args = options.args;
  let passing = '';
  let failing = '';
  let pending = '';

  const cmd = spawn(main, args);

  cmd.stdout.on('data', (out) => {
    // outputLines.push(data);
    const data = `${out}`;
    console.log(data);
    if(data.indexOf('passing') !== -1 ||
        data.indexOf('failing') !== -1 ||
        data.indexOf('pending') !== -1) {
      passing = data.match(/(\d+ passing)/i);
      console.log(passing[0]);
      failing = data.match(/(\d+ failing)/i);
      console.log(failing[0]);
      pending = data.match(/(\d+ pending)/i);
      console.log(pending[0]);

      const results = [
        passing[0] || '',
        failing[0] || '',
        pending[0] || '',
      ].join('\n');

      growl(`Test Complete:\n${results}`);
    }
  });

  // cmd.stderr.on('data', (out) => {
  //   // outputLines.push(data);
  // });

  cmd.on('close', (code) => {
    console.log(`Exited with code ${code}`);
  });
};