/**
 * Content block model
 * 
 */
define([
  'models/base'
], function(BaseModel) {
  return BaseModel.extend({
    url: '/content_blocks/slot',
    //content_blocks: new ContentBlocksCollection,
    initialize: function() {
    }
  });
});
