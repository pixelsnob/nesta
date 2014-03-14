/**
 * Image upload view
 * 
 */
define([
  'views/base',
  'models/cms/image',
  'jade'
], function(BaseView, ImageModel, jade) {
  return BaseView.extend({
    
    model: new ImageModel,

    events: {
      'change input[type=file]':   'fileChange',
      'click .upload':             'upload' 
    },

    initialize: function() {
      this.setElement($(jade.render('cms/image_upload')));
      this.$file_input    = this.$el.find('input[type=file]');
      this.$image_preview = this.$el.find('.upload_preview img');
      this.$error         = this.$el.find('.error');
      this.$upload_btn    = this.$el.find('.btn.upload');
      this.$image_preview.hide();
      this.$upload_btn.hide();
      this.listenTo(this.model, 'upload', this.success);
      this.listenTo(this.model, 'error', this.error);
      this.listenTo(this.model, 'change', this.uploadReady);
    },
    
    fileChange: function(ev) {
      var file      = ev.currentTarget.files[0],
          reader    = new FileReader,
          obj       = this;
      this.$error.empty();
      reader.onload = function(ev) {
        obj.model.set({
          mime_type: file.type,
          size:      file.size,
          data:      reader.result
        });
        reader.onload = null;
      };
      reader.readAsDataURL(file);
      return false;
    },
    
    uploadReady: function(model) {
      var img = new Image,
          obj = this;
      img.onload = function() {
        if (model.isValid()) {
          obj.$image_preview.show().attr('src', img.src);
          obj.$upload_btn.show();
        } else {
          obj.$error.text(model.validationError);
        }
      };
      img.src = model.get('data');
    },

    upload: function(form_data) {
      var file      = this.$file_input.get(0).files[0],
          form_data = new FormData;
      form_data.append('image', file);
      this.model.set('data', form_data);
      this.model.upload();
      return false;
    },
    
    success: function(data) {
      this.$image_preview.hide();
      this.$error.empty();
      this.$upload_btn.hide();
      // Clear the file input, so that the same filename can be uploaded again
      this.$el.find('form').get(0).reset();
      this.trigger('upload', data);
    },
    
    error: function(data) {
      var msg = 'Error: the image was not uploaded';
      this.$error.text(msg);
    },

    render: function() {
      return this.$el;
    }
    
  });
});
