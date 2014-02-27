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
    // Start at -1 because on page load, change event will fire, incrementing
    // this value. We want it to start at 0.
    changed_count: -1,

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
        //console.log('(change)' + model.changed_count);
      });
      // Save a copy fetched from the server for comparisons, etc.
      this.listenTo(this, 'sync', function(model) {
        this.saved = _.clone(this.attributes);
        model.changed_count = 0;
        //console.log('(sync)' + model.changed_count);
      });
    },
    
    revert: function() {
      this.changed_count = -1;
      this.set(this.saved);
    }
  });
});
