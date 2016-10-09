#!/usr/bin/env node

'use strict';

var cli = require('../src/cli');
var cappu = require('../src').cappu;
var options = cli(process.argv);

cappu(options);