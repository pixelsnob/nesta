/**
 * Content blocks view
 * 
 */
define([
  'backbone',
  'collections/cms/content_blocks',
  'views/cms/content_block'
], function(Backbone, ContentBlocksCollection, ContentBlockView) {
  return Backbone.View.extend({
    collection: new ContentBlocksCollection,
    events: {
    },
    views: [],
    initialize: function(opts) {
      this.setElement(opts.el);
      this.listenTo(this.collection, 'reset', function(collection) {
        collection.each(_.bind(function(model) {
          this.add(model);
        }, this));
      });
      this.collection.reset(opts.content_blocks);  
    },
    add: function(model) {
      var el = $('.content_block#' + model.get('name'));
      this.views.push(new ContentBlockView({ el: el, model: model }));
    }
  });
});
