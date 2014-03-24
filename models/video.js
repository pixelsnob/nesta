
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var VideoSchema = Schema({
  path:      { type: String, unique: true, required: true },
  mime_type: { type: String, enum: [ 'video/mp4', 'video/webm', 'video/quicktime' ] },
  size:      { type: Number, max: (100 * 1000 * 1000) }
}, {
  collection: 'videos'
});

module.exports = mongoose.model('Video', VideoSchema);

