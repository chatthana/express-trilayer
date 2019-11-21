const { Router } = require('express');
const container = require('../container');

module.exports = () => {
  const router = Router();
  const { config } = container.cradle;

  router.get('/', (req, res) => {
    const { version } = config;
    return res.json({ version });
  });

  return router;
}