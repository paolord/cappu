FROM node:4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

CMD [ "npm", "run", "test:demo" ]