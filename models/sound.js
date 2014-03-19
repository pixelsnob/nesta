

var mongoose   = require('mongoose'),
    Schema     = mongoose.Schema;

var SoundSchema = Schema({
  path:      { type: String, unique: true, required: true },
  mime_type: { type: String, enum: [ 'audio/mpeg', 'audio/mp3', 'video/mp4' ] },
  size:      { type: Number }
}, {
  collection: 'sounds'
});

module.exports = mongoose.model('Sound', SoundSchema);

