'use strict';

const expect = require('chai').expect;

const parser = require('../src/parser');

describe('Parser', () => {
  describe('#mocha', () => {
    it('should detect the correct result from spec reporter', (done) => {
      // emulate mocha stdout
      const data = 'mocha --reporter spec ./test/*.unit.js\
                    25 passing (11s)\
                    2 pending';
      parser(data, (results) => {
        expect(results).to.eql('25 passing  2 pending');
        done();
      });
    });
  });
});