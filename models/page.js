
var mongoose          = require('mongoose'),
  ContentBlock        = require('./content_block.js'),
  Layout              = require('./layout.js'),
  Schema              = mongoose.Schema;

var PageSchema = Schema({
  path: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  keywords: { type: String, required: true },
  description: { type: String, required: true },
  layout: { type: Schema.Types.ObjectId, ref: 'Layout' },
  content_blocks: [{ type: Schema.Types.ObjectId, ref: 'ContentBlock' }]
});

module.exports = mongoose.model('Page', PageSchema);

