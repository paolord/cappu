'use strict';

module.exports = function(argv) {
  const cmd = argv[2];
  const args = argv.splice(3, argv.length);

  return {
    cmd,
    args,
  };
};