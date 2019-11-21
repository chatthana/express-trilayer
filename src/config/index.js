const pkg = require('../../package.json');

module.exports = {
  apiPort: process.env.API_PORT,
  version: pkg.version
};