/**
 * Content blocks view
 * 
 */
define([
  'backbone',
  'views/cms/content_block',
  'collections/cms/content_blocks'
], function(Backbone, ContentBlockView, ContentBlocksCollection) {
  return Backbone.View.extend({
    events: {
    },
    views: [],
    collection: ContentBlocksCollection,
    initialize: function(opts) {
      this.collection.each(this.add);
    },
    add: function(model) {
      var el = this.$('#' + model.id);
      var view = new ContentBlockView({ model: model, el: el });
      view.render();
    }
  });
});
