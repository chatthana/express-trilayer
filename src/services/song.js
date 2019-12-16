const uuid = require('uuid/v4');

module.exports = class SongService {
  constructor({ db: { models: { Song } }, errorHandlers }) {
    this.song = Song;
    this.errorHandlers = errorHandlers;
  }

  async getSongs(filter) {
    const songs = this.song.find(filter || {});
    this.errorHandlers.throwIf(!songs, 'No song found', 404);
    return songs;
  }

  async createSong(songPayload) {
    const { trackName, artist, releaseDate } = songPayload;
    const songGuid = uuid();
    const existingTrackName = await this.song.countDocuments({ trackName });
    this.errorHandlers.throwIf(existingTrackName, 'The song already exists', 400);
    return this.song.create({ trackName, artist, releaseDate, guid: songGuid });
  }

  async updateSong(guid, songPayload) {
    const result = await this.song.updateOne({ guid }, { $set: songPayload });
    return result; 
  }

  async deleteSong(guid) {
    const { deletedCount } = await this.song.deleteOne({ guid });
    this.errorHandlers.throwIf(deletedCount === 0, 'Failed to delete the entity', 404);
    return result;
  }
}