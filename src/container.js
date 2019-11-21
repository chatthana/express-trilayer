const { createContainer, asValue, asFunction, asClass } = require('awilix');
const container = createContainer();

const Config = require('./config');
const Router = require('./router');
const Server = require('./server');

container.register({
  config: asValue(Config),
  server: asFunction(Server).singleton(),
  router: asFunction(Router).singleton()
});

module.exports = container;
