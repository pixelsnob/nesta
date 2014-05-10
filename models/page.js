
var mongoose          = require('mongoose'),
  Schema              = mongoose.Schema;

var PageSchema = Schema({
  path: { type: String, unique: true, required: true },
  title: { type: String, required: false, default: '' },
  keywords: { type: String, required: false, default: '' },
  description: { type: String, required: false, default: '' },
  view: { type: String, required: true, default: 'cms/pages/default' },
  content_blocks: [{
    name: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, required: true, enum: [ 'markdown' ] }
  }]
});

module.exports = mongoose.model('Page', PageSchema);

