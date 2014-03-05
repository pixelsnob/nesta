/**
 * List of images
 * 
 */
define([
  'backbone',
  'views/modal',
  'collections/cms/images',
  'views/cms/image',
  'views/cms/image_upload',
  'jade'
], function(
  Backbone,
  ModalView,
  ImagesCollection,
  ImageView,
  ImageUploadView,
  jade
) {
  return ModalView.extend({
    collection: new ImagesCollection,
    events: {
      'click tr': 'selectImage' 
    },

    initialize: function() {
      this.setElement($(jade.render('cms_images'))); // << change the name of this
      this.listenTo(this.collection, 'sync change', this.render);
      this.image_upload_view = new ImageUploadView({
        
      });
      this.$el.find('.image_upload').html(this.image_upload_view.render());
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
    
    selectImage: function(ev) {
      this.$el.find('tr.selected').removeClass('selected');
      $(ev.currentTarget).addClass('selected');
      /*var image_editor_view = new ImageEditorView({
        id: this.collection.get($(ev.currentTarget).attr('id'))
      });
      this.$el.append(image_editor_view.render());*/
    },
    
    getSelectedId: function() {
      var selected = this.$el.find('tr.selected');
      if (selected.length) {
        return selected.attr('id');
      }
    }
  });
});
