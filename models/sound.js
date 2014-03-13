

var mongoose   = require('mongoose'),
    Schema     = mongoose.Schema;

var SoundSchema = Schema({
  path:      { type: String, unique: true, required: true },
  mime_type: { type: String, enum: [ 'audio/mpeg', 'audio/mp3' ] },
  size:      { type: Number, max: 5000000 }
}, {
  collection: 'sounds'
});

module.exports = mongoose.model('Sound', SoundSchema);

