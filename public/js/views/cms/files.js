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
      'click tr':         'select',
      'click .remove a':  'remove'
    },
    
    initialize: function() {
      this.setElement($(jade.render('cms_images')));
      this.listenTo(this.collection, 'sync add remove', this.render);
      var image_upload_view = new ImageUploadView({
        collection: this.collection
      });
      this.$el.find('.image_upload').html(image_upload_view.render());
      // Listen for image uploads, to highlight uploaded file
      this.listenTo(image_upload_view, 'upload', function(data) {
        this.collection.add(data);
        this.clearSelected();
        if (typeof data._id != 'undefined') {
          this.$el.find('tr[id=' + data._id + ']').addClass('selected');
        }
      });
    },
    
    render: function() {
      var obj = this;
      this.$el.find('table').empty();
      this.collection.each(function(model) {
        var image_view = new ImageView({ model: model });
        obj.$el.find('table').append(image_view.render());
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
    
    select: function(ev) {
      this.clearSelected();
      $(ev.currentTarget).addClass('selected');
    },
    
    getSelectedId: function() {
      var selected = this.$el.find('tr.selected');
      if (selected.length) {
        return selected.attr('id');
      }
    },

    clearSelected: function() {
      this.$el.find('tr.selected').removeClass('selected');
    },

    remove: function(ev) {
      var msg = 'Are you sure? Existing links to this image will be broken!';
      if (confirm(msg)) {
        var id = $(ev.currentTarget).closest('tr').attr('id');
        var model = this.collection.get(id);
        if (model) {
          model.destroy();
        }
      }
      return false;
    }
  });
});

