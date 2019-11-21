require('dotenv').config();
const container = require('./src/container');
const apiServer = container.resolve('server');

apiServer.start();