/**
 * Content blocks view
 * 
 */
define([
  'views/base',
  'collections/cms/content_blocks',
  'views/cms/content_block'
], function(BaseView, ContentBlocksCollection, ContentBlockView) {
  return BaseView.extend({
    
    collection: new ContentBlocksCollection,    
    views: [],
    
    initialize: function(opts) {
      this.setElement(opts.el);
      this.collection.each(_.bind(function(model) {
        this.add(model);
      }, this));
    },
    
    add: function(model) {
      var el = $('.content_block#' + model.get('name'));
      this.views.push(new ContentBlockView({ el: el, model: model }));
    }
  });
});
