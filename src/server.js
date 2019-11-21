const express = require('express');

module.exports = ({ config, router }) => {
  const app = express();
  app.use('/api/v1', router);

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