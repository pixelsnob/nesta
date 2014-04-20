
var mongoose   = require('mongoose')

var ContentBlockSchema = mongoose.Schema({
  content: { type: String, required: true },
  type: { type: String, required: true, enum: [ 'markdown' ] }
}, {
  collection: 'content_blocks'
});

module.exports = mongoose.model('ContentBlock', ContentBlockSchema);

