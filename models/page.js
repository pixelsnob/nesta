
var mongoose          = require('mongoose'),
  ContentBlock        = require('./content_block.js'),
  //Layout              = require('./layout.js'),
  Schema              = mongoose.Schema;

var PageSchema = Schema({
  path: { type: String, unique: true, required: true },
  title: { type: String, required: false },
  keywords: { type: String, required: false },
  description: { type: String, required: false },
  content_blocks: [{
    slot: { type: String, required: true },
    content_block: { type: Schema.Types.ObjectId, ref: 'ContentBlock' }
  }]
});

module.exports = mongoose.model('Page', PageSchema);

