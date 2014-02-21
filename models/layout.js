
var mongoose          = require('mongoose'),
  ContentBlock        = require('./content_block.js'),
  Schema              = mongoose.Schema;

var LayoutSchema = Schema({
  file: { type: String, unique: true, required: true },
  content_blocks: [{ type: Schema.Types.ObjectId, ref: 'ContentBlock' }]
});

module.exports = mongoose.model('Layout', LayoutSchema);

