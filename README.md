# cappu

Trigger desktop notifications from JS testing frameworks, based on growl.

[![Travis](https://img.shields.io/travis/paolord/cappu.svg)](https://travis-ci.org/paolord/cappu) 
[![npm](https://img.shields.io/npm/v/cappu.svg?maxAge=2592000)](https://www.npmjs.com/package/cappu) 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/paolord/cappu/master/LICENSE)

Specially useful when tests are ran inside a docker container.

Works with the following testing frameworks and reporters:
* Mocha
  * spec
  * tap

## Installation
Follow instructions on [node-growl](https://github.com/tj/node-growl) and install it, then install cappu:
```
$ npm install -g cappu
```

## Example Use Case
Mocha tests are ran inside a docker container and you want to trigger notifications on the host OS.

test.js
```
const expect = require('chai').expect;
describe('demo only', () => {
  it('should pass', () => {
    expect(1).to.eql(1);
  });
});
```
package.json
```
...
  "scripts": {
    "test": "docker build -t test/cappu-test . && docker run -d test/cappu-test",
    "test:mocha": "mocha --reporter spec --colors ./test/demo/test.js"
  }
...
```
Dockerfile
```
FROM node:4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

CMD [ "npm", "run", "test:mocha" ]
```
Run the test through the cappu command
```
$ cappu npm test
```

## Tests
Install docker before running:
```
$ npm test
```