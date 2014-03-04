/**
 * List of images
 * 
 */
define([
  'backbone',
  'views/modal',
  'collections/cms/images',
  'views/cms/image',
  'jade'
], function(Backbone, ModalView, ImagesCollection, ImageView, jade) {
  return ModalView.extend({
    collection: new ImagesCollection,
    events: {
    },
    initialize: function() {
      this.setElement($(jade.render('cms_images')));
    },
    render: function() {
      var obj = this;
      this.$el.find('table').empty();
      this.collection.each(function(model) {
        var image = new ImageView({
          model: model
        });
        obj.$el.find('table').append(image.render());
      });
      return this.$el;  
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
