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
    },
    
    initialize: function() {
      this.setElement($(jade.render('cms_images')));
      this.listenTo(this.collection, 'sync change', this.render);
      this.listenTo(this.collection, 'add', this.add);
      var image_upload_view = new ImageUploadView({
        collection: this.collection
      });
      this.$el.find('.image_upload').html(image_upload_view.render());
      // Listen for image uploads, to highlight uploaded file
      this.listenTo(image_upload_view, 'upload', function(model) {
        this.collection.add(model);
        this.$el.find('tr.selected').removeClass('selected');
        this.$el.find('tr[id=' + model.id + ']').addClass('selected');
      });
    },
    
    add: function(model) {
      var image_view = new ImageView({ model: model });
      if (!this.$el.find('tr[id=' + model.id + ']').length) {
        this.$el.find('table').append(image_view.render());
      }
    },

    render: function() {
      var obj = this;
      this.$el.find('table').empty();
      this.collection.each(function(model) {
        obj.add(model);
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
    },
    
    getSelectedId: function() {
      var selected = this.$el.find('tr.selected');
      if (selected.length) {
        return selected.attr('id');
      }
    }
  });
});

