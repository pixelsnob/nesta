/**
 * CMS page model
 * 
 */
define([
  'backbone',
  'collections/cms/content_blocks'
], function(Backbone, ContentBlocksCollection) {
  return Backbone.Model.extend({
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
      this.listenTo(this, 'sync', function(model) {
        this.saved = _.clone(this.attributes);
      });
    },
    revert: function() {
      // Have to set this way to trigger change event
      this.set(_.clone(this.saved));
    }
  });
});
