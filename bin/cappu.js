#!/usr/bin/env node
'use strict';
var cli = require('../lib/cli');
var cappu = require('../lib');
var options = cli(process.argv);

cappu(options);