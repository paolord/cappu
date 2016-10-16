'use strict';

const expect = require('chai').expect;

const cli = require('../lib/cli');

describe('CLI', () => {
  it('should return the correct arguments', () => {
    // include node command at the start because of #!/usr/bin/env node
    const options = cli(['node', 'cappu', 'npm', 'test']);
    
    expect(options).to.deep.eql({
      cmd: 'npm',
      args: ['test'],
    });
  });
});