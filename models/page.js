
var mongoose          = require('mongoose'),
  ContentBlock        = require('./content_block.js'),
  //Layout              = require('./layout.js'),
  Schema              = mongoose.Schema;

var PageSchema = Schema({
  path: { type: String, unique: true, required: true },
  title: { type: String, required: false, default: '' },
  keywords: { type: String, required: false, default: '' },
  description: { type: String, required: false, default: '' },
  view: { type: String, required: true, default: 'cms/pages/default' },
  content_blocks: [{
    name: { type: String, required: true },
    content_block: { type: Schema.Types.ObjectId, ref: 'ContentBlock' }
  }]
});

module.exports = mongoose.model('Page', PageSchema);

