const { Router } = require('express');
const container = require('../container');
const joi = require('joi');

module.exports = () => {
  const router = Router();
  const { songService, responseHandlers, errorHandlers } = container.cradle;

  router.get('/', async (req, res, next) => {
    try {
      const result = await songService.getSongs();
      return res.json(result);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:guid', async (req, res, next) => {
    try {
      await songService.deleteSong(req.params.guid);
      const response = responseHandlers.createSuccessResponse('Successfully deleted the song');
      return res.json(response);
    } catch (error) {
      next(error);
    }
  });

  router.use((req, res, next) => {
    const schema = joi.object({
      trackName: joi.string().required(),
      artist: joi.string().required(),
      releaseDate: joi.string().required(),
    });

    const result = schema.validate(req.body);
    errorHandlers.throwIf(result.error, result.error, 400);
    next();
  });

  router.post('/', async (req, res, next) => {
    try {
      const songPayload = req.body;
      const result = await songService.createSong(songPayload);
      const response = responseHandlers.createSuccessResponse('Successfully created the song', result);
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  });

  router.put('/:guid', async (req, res, next) => {
    try {
      const guid = req.params.guid;
      const songPayload = req.body;
      await songService.updateSong(guid, songPayload);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}