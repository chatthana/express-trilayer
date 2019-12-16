const { Schema, model } = require('mongoose');

const schema = new Schema({
  guid: String,
  trackName: String,
  releaseDate: Date,
  artist: String
}, {
  versionKey: false
});

module.exports = model('Song', schema);