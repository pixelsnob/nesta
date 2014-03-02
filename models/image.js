
var mongoose          = require('mongoose'),
  Schema              = mongoose.Schema;

var ImageSchema = Schema({
  path: { type: String, unique: true, required: true },
  name: { type: String, required: false, default: '' }
}, {
  collection: 'images'
});

module.exports = mongoose.model('Image', ImageSchema);

