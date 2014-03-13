
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var ImageSchema = Schema({
  path:      { type: String, unique: true, required: true },
  mime_type: { type: String, enum: [ 'image/jpeg', 'image/png' ] },
  size:      { type: Number, max: 200000 }
}, {
  collection: 'images'
});

module.exports = mongoose.model('Image', ImageSchema);

