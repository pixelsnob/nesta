/**
 * Options form view
 * 
 */
define([
  'backbone',
  'views/modal',
  'collections/cms/images',
  'jade',
  'bootstrap'
], function(Backbone, ModalView, ImagesCollection, jade) {
  return ModalView.extend({
    collection: new ImagesCollection,
    initialize: function() {
    },
    render: function() {
      var tpl = $(jade.render('cms_images', {
        images: this.collection.toJSON()
      }));
      return tpl;
    },
    modal: function() {
      var modal_view = new ModalView({ el: this.el });
      this.listenTo(modal_view, 'open', function() {
        
      });
      this.listenTo(modal_view, 'save', function() {
        
      });
      modal_view.modal({
        body: this.render()
      });
    }
  });
});
