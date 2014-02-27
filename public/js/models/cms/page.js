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
    changed_count: 0,
    initialize: function() {
      // Keep content_blocks collection in sync with model
      this.listenTo(this, 'change:content_blocks', function(model) {
        this.content_blocks.set(model.get('content_blocks'));
      });
      this.listenTo(this.content_blocks, 'change', function(model) {
        this.set('content_blocks', this.content_blocks.toJSON()); 
      });
      this.listenTo(this, 'change', function(model) {
        // Keep track of how many times the values have been changed
        model.changed_count++;
      });
      // Save a copy fetched from the server for comparisons, etc.
      this.listenTo(this, 'sync', function(model) {
        this.saved = _.clone(this.attributes);
      });
    },
    revert: function() {
      this.changed_count = -1;
      this.set(this.saved);
    }
  });
});
