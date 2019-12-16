const { createContainer, asValue, asFunction, asClass } = require('awilix');
const container = createContainer();

const Config = require('./config');
const Router = require('./router');
const Server = require('./server');
const Database = require('./database');
const SongService = require('./services/song');
const ErrorHandlers = require('./utils/error.js');
const ResponseHandlers = require('./utils/response');

container.register({
  config: asValue(Config),
  server: asFunction(Server).singleton(),
  router: asFunction(Router).singleton(),
  db: asFunction(Database).singleton(),
  songService: asClass(SongService).singleton(),
  errorHandlers: asFunction(ErrorHandlers).singleton(),
  responseHandlers: asFunction(ResponseHandlers).singleton()
});

module.exports = container;
