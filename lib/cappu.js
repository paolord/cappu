'use strict';

var spawn = require('child_process').spawn;
var growl = require('growl');
var parser = require('./parser');

module.exports = function (options, cb) {
  var main = options.cmd;
  var args = options.args;
  var logging = options.logging || true;

  var cmd = spawn(main, args);

  cmd.stdout.on('data', function (out) {
    var data = '' + out;
    if (logging) {
      console.log(data);
    }

    parser(data, function (results) {
      if (process.env.NODE_ENV !== 'test') {
        console.log('Test Complete:\n' + results);
        growl('Test Complete:\n' + results);
      } else {
        console.log(results);
        cb();
      }
    });
  });

  // cmd.stderr.on('data', (out) => {
  //   // outputLines.push(data);
  // });

  cmd.on('close', function (code) {
    console.log('Exited with code ' + code);
  });
};