
var mongoose   = require('mongoose'),
    types      = [ 'markdown' ];

var ContentBlockSchema = mongoose.Schema({
  content: { type: String, required: true },
  type: { type: String, required: true, enum: types }
}, {
  collection: 'content_blocks'
});

module.exports = mongoose.model('ContentBlock', ContentBlockSchema);

