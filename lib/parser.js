'use strict';

var detected = false;
var code = 0;

/* mocha spec reporter */
var passing = void 0;
var failing = void 0;
var pending = void 0;

/*  mocha tap reporter */
var pass = void 0;
var fail = void 0;
var tests = void 0;

function returnIfNotEmpty(list, index, d) {
  if (typeof list === 'undefined' || list === null) {
    return '';
  } else if (index < list.length) {
    if (typeof list[index] !== 'undefined' && list[index] !== null) {
      return list[index];
    }
  }
  if (typeof d !== 'undefined') {
    return d;
  }
  return '';
}

module.exports = function (data, cb) {
  if (!detected) {
    if (data.indexOf('mocha') !== -1) {
      var reporter = data.match(/(--reporter \w+)/i)[0] || '';
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
      if (data.indexOf('passing') !== -1 || data.indexOf('failing') !== -1 || data.indexOf('pending') !== -1) {
        passing = returnIfNotEmpty(data.match(/(\d+ passing)/i), 0);
        failing = returnIfNotEmpty(data.match(/(\d+ failing)/i), 0);
        pending = returnIfNotEmpty(data.match(/(\d+ pending)/i), 0);

        cb([passing, failing, pending].join(' '));
      }
    }

    /* code 1: mocha tap reporter */
    if (code === 1) {
      if (data.indexOf('# tests') !== -1 || data.indexOf('# pass') !== -1 || data.indexOf('# fail') !== -1) {
        tests = returnIfNotEmpty(data.match(/(\# tests \d+)/i), 0, '# tests 0');
        pass = returnIfNotEmpty(data.match(/(\# pass \d+)/i), 0, '# pass 0');
        fail = returnIfNotEmpty(data.match(/(\# fail \d+)/i), 0, '# fail 0');

        cb(['Test: ' + tests.split(' ')[2], 'Pass: ' + pass.split(' ')[2], 'Fail: ' + fail.split(' ')[2]].join(' '));
      }
    }
    if (process.env.NODE_ENV === 'test') {
      code = 0;
      detected = false;
    }
  }
};