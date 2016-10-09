'use strict';

let detected = false;
let code = 0;

/* mocha spec reporter */
let passing;
let failing;
let pending;

/*  mocha tap reporter */
let pass;
let fail;
let tests;

module.exports = (data, cb) => {
  if (!detected) {
    if (data.indexOf('mocha') !== -1) {
      const reporter = data.match(/(--reporter \w+)/i)[0] || '';
      detected = true;
      code = 0;
      if (reporter.split(' ')[1] === 'spec') {
        code = 0;
      }
      if (reporter.split(' ')[1] === 'tap') {
        code = 1;
      }
    }
  }
  if (detected) {
    /* code 0: mocha spec reporter */
    if (code === 0) {
      if (data.indexOf('passing') !== -1 ||
          data.indexOf('failing') !== -1 ||
          data.indexOf('pending') !== -1) {
        passing = data.match(/(\d+ passing)/i)[0] || '';
        failing = data.match(/(\d+ failing)/i)[0] || '';
        pending = data.match(/(\d+ pending)/i)[0] || '';
        cb([
          passing,
          failing,
          pending,
        ].join('\n'));
      }
    }

    /* code 1: mocha tap reporter */
    if (code === 1) {
      if (data.indexOf('# tests') !== -1 ||
          data.indexOf('# pass') !== -1 ||
          data.indexOf('# fail') !== -1) {
        tests = data.match(/(\# tests \d+)/i)[0] || '0';
        pass = data.match(/(\# pass \d+)/i)[0] || '0';
        fail = data.match(/(\# fail \d+)/i)[0] || '0';
        cb([
          `Test: ${tests.split(' ')[2]}`,
          `Pass: ${pass.split(' ')[2]}`,
          `Fail: ${fail.split(' ')[2]}`,
        ].join('\n'));
      }
    }
  }
};