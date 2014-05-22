/**
 * CMS page model
 * 
 */
define([
  './base',
  '../collections/content_blocks'
], function(BaseModel, ContentBlocksCollection) {
  return BaseModel.extend({
    url: window.location.pathname,
    content_blocks: new ContentBlocksCollection,
    initialize: function() {
      // Keep content_blocks collection in sync with model
      this.listenTo(this, 'change:content_blocks', function(model) {
        this.content_blocks.set(model.get('content_blocks'));
      });
      this.listenTo(this.content_blocks, 'change', function(model) {
        this.set('content_blocks', this.content_blocks.toJSON()); 
      });
      BaseModel.prototype.initialize.apply(this);
    }
  });
});
