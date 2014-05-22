/**
 * Content block model
 * 
 */
define([
  './base'
], function(BaseModel) {
  return BaseModel.extend({
    url: function() {
      return 'cms/content_blocks/' + this.get('content_block')._id;
    },
    initialize: function() {
    }
  });
});
