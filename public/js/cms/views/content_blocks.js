/**
 * Content blocks view
 * 
 */
define([
  './base',
  './content_block'
], function(BaseView, ContentBlockView) {
  return BaseView.extend({
    
    views: [],
    
    initialize: function(opts) {
      this.collection = opts.collection;
      this.page       = opts.page;
      this.setElement(opts.el);
      this.collection.each(_.bind(function(model) {
        this.add(model);
      }, this));
    },
    
    add: function(model) {
      var el = $('#content-' + model.get('name'));
      this.views.push(new ContentBlockView({
        el: el,
        page: this.page,
        model: model
      }));
    }
  });
});
