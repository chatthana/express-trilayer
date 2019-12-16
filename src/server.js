const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

module.exports = ({ config, router, errorHandlers }) => {

  const app = express();
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // Register the API base router
  app.use('/api/v1', router);

  app.use((req, res, next) => {
    errorHandlers.throwError('No route matched', 404);
  });

  app.use(errorHandlers.handleError);

  return {
    app,
    start: () => {
      return Promise.resolve()
        .then(() => {
          const http = app.listen(config.apiPort, () => {
            const { port } = http.address();
            console.log('The api is running on the port %s', port);
          });
        });
    }
  }
  
}