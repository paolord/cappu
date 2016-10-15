'use strict';

const spawn = require('child_process').spawn;
const growl = require('growl');
const parser = require('./parser');

module.exports = (options, cb) => {
  const main = options.cmd;
  const args = options.args;
  const logging = options.logging || true;

  const cmd = spawn(main, args);

  cmd.stdout.on('data', (out) => {
    const data = `${out}`;
    if (logging) {
      console.log(data);
    }

    parser(data, (results) => {
      if (process.env.NODE_ENV !== 'test') {
        growl(`Test Complete:\n${results}`);
      } else {
        cb();
      }
    });
  });

  // cmd.stderr.on('data', (out) => {
  //   // outputLines.push(data);
  // });

  cmd.on('close', (code) => {
    console.log(`Exited with code ${code}`);
  });
};