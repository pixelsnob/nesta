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
      this.listenTo(this.collection, 'sync change', this.render);
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
      this.listenTo(modal_view, 'save', function() {
        this.trigger('add_image_save');
      });
      modal_view.modal({
        body: this.render()
      });
    },
    getSelectedId: function() {
      var selected = this.$el.find('tr.selected');
      if (selected.length) {
        return selected.attr('id');
      }
    }
  });
});
