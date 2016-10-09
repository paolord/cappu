'use strict';

module.exports = function(argv) {

  const cmd = argv.splice(2, argv.length);
  
  return {
    args: cmd
  };
};