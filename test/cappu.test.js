'use strict';

const expect = require('chai').expect;

const cli = require('../src/cli');
const cappu = require('../src/cappu');

describe('Integration', () => {
  it('should trigger the callback when it is time to trigger growl and display results', (done) => {
    const options = cli(['node', 'cappu', 'npm', 'run', 'test:docker']);
    cappu(options, () => {
      done(); // call done to emulate triggering growl
    });
  });
});