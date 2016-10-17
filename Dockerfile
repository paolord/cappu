FROM node:4.4.7-slim

ENTRYPOINT [ "npm", "run", "test:demo" ]