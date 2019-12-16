const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = ({ config }) => {

  const db = mongoose.connect(config.mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const modelPath = path.resolve(__dirname, 'models');
  const models = {};

  fs.readdirSync(modelPath).forEach(modelFile => {
    const model = require(path.resolve(modelPath, modelFile));
    models[model.modelName] = model;
  });

  return { db, models };
};