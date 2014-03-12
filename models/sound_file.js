
var mongoose          = require('mongoose'),
  Schema              = mongoose.Schema;

var SoundFileSchema = Schema({
  path: { type: String, unique: true, required: true },
  name: { type: String, required: false, default: '' }
}, {
  collection: 'sound_files'
});

module.exports = mongoose.model('SoundFile', SoundFileSchema);

