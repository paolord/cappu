'use strict';

const spawn = require('child_process').spawn;
const Server = require('./server');
// const parser = require('./parser/mocha');
const http = require('http');

exports.cappu = (options) => {
  const args = options.args;
  let passing = '';
  let failing = '';
  let pending = '';
  // const outputLines = [];


  require('dns').lookup(require('os').hostname(), (err, hostname, fam) => {
    console.log('Cappu running on: '+hostname);
    const server = new Server({
      hostname
    });

    process.env['CAPPU_HOSTNAME'] = hostname;
    // process.env['CAPPU_PORT'] = 31213;

    const cmd = spawn(args.join(' '));

    cmd.stdout.on('data', (data) => {
      // outputLines.push(data);
      if(data.indexOf('passing') !== -1) {
        passing = data.match(/(\d passing)/i);
      } else if(data.indexOf('failing') !== -1) {
        failing = data.match(/(\d failing)/i);
      } else if(data.indexOf('pending') !== -1) {
        pending = data.match(/(\d pending)/i);
      }
    });

    cmd.stderr.on('data', (data) => {
      // outputLines.push(data);
      if(data.indexOf('passing') !== -1) {
        passing = data.match(/(\d passing)/i);
      } else if(data.indexOf('failing') !== -1) {
        failing = data.match(/(\d failing)/i);
      } else if(data.indexOf('pending') !== -1) {
        pending = data.match(/(\d pending)/i);
      }
    });

    // cmd.on('close', (code) => {
    //   console.log(`child process exited with code ${code}`);
    // });

    server.start(() => {
      // return parsed stdout here
      // return parser(outputLines);
      return {
        passing,
        failing,
        pending
      };
    });
  });
};

exports.notify = () => {
  function shutdown() {
    const cappuHost = process.env.CAPPU_HOSTNAME;
    const host = `${cappuHost}:31213`;
    // signal the web server at the host OS
    http.get({
      host
    });
  }

  process
    .once('exit', shutdown)
    .once('SIGINT', shutdown)
    .once('SIGTERM', shutdown);
};