'use strict';

module.exports = function (argv) {
  var cmd = argv[2];
  var args = argv.splice(3, argv.length);

  return {
    cmd: cmd,
    args: args
  };
};