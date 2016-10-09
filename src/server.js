'use strict';

const http = require('http');
const growl = require('growl');
// const url = require('url');

class HttpService {
  constructor(options) {
    this.hostname = options.hostname;
    this.port = options.port || 31213;
  }

  start(cb) {
    this.server = http.createServer((req, res) => {
      // const queryData = url.parse(req.url, true).query;
      // console.log(queryData.message);
      res.setHeader('Content-Type', 'text/plain');
      res.end('ok');
      this.notify(cb());
    });

    this.server.listen(this.port, this.hostname, () => {
      console.log('Running on: '+this.hostname);
    });
  }

  notify(msg) {
    growl(`${msg.passing}\n${msg.failing}\n${msg.pending}`);
  }
}

module.exports = HttpService;
