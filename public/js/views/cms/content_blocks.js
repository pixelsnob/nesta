/**
 * Content blocks view
 * 
 */
define([
  'views/base',
  'views/cms/content_block'
], function(BaseView, ContentBlockView) {
  return BaseView.extend({
    
    views: [],
    
    initialize: function(opts) {
      this.collection = opts.collection;
      this.setElement(opts.el);
      this.collection.each(_.bind(function(model) {
        this.add(model);
      }, this));
    },
    
    add: function(model) {
      var el = $('.content_block#' + model.get('name'));
      this.views.push(new ContentBlockView({
        el: el,
        model: model
      }));
    }
  });
});
