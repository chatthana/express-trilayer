const { Router } = require('express');
const cors = require('cors');
module.exports = () => {
  const router = Router();
  router.use(cors());
  router.use('/info', require('./controllers/info')());
  router.use('/songs', require('./controllers/song')());
  return router;
}