const { Router } = require('express');
module.exports = () => {
  const router = Router();
  router.use('/info', require('./controllers/info')());
  return router;
}