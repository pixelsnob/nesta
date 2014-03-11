/**
 * Image view
 * 
 */
define([
  'backbone',
  'models/cms/image',
  'jade'
], function(Backbone, ImageModel, jade) {
  return Backbone.View.extend({
    events: {
      'change input[type=file]':   'change',
      'click .upload':             'uploadImage' 
    },

    initialize: function() {
      this.setElement($(jade.render('cms/image_upload')));
      this.$file_input    = this.$el.find('input[type=file]');
      this.$image_preview = this.$el.find('.upload_preview img');
      this.$error         = this.$el.find('.error');
      this.$image_preview.hide();
      this.$upload_btn = this.$el.find('.btn.upload');
      this.$upload_btn.hide();
    },
    
    change: function(ev) {
      var file      = ev.currentTarget.files[0],
          reader    = new FileReader,
          obj       = this,
          types     = [ 'image/jpeg', 'image/png' ];
      this.$error.empty();
      reader.onload = function(ev) {
        var img = new Image;
        img.onload = function() {
          if (_.indexOf(types, file.type) == -1) {
            var msg = 'Image must be one of: ' + types.join(', ');
            return obj.$error.text(msg);
          }
          var size     = Math.round(file.size / 1000),
              max_size = 200;
          if (size > 200) {
            var msg = 'Image size must be less than ' + max_size + 'KB';
            return obj.$error.text(msg);
          }
          obj.$image_preview.show().attr('src', img.src);
          obj.$upload_btn.show();
        };
        img.src = reader.result;
        reader.onload = null;
      };
      reader.readAsDataURL(file);
      return false;
    },
    
    uploadImage: function(form_data) {
      var file      = this.$file_input.get(0).files[0],
          form_data = new FormData;
      form_data.append('image', file);
      $.ajax({
        url:         '/cms/images',
        type:        'POST',
        success:     _.bind(this.uploadImageSuccess, this),
        error:       _.bind(this.uploadImageError, this),
        data:        form_data,
        dataType:    'json',
        cache:       false,
        contentType: false,
        processData: false
      });
      return false;
    },
    
    uploadImageSuccess: function(data) {
      this.$image_preview.hide();
      this.$error.empty();
      this.$upload_btn.hide();
      // Clear the file input, so that the same filename can be uploaded again
      this.$el.find('form').get(0).reset();
      this.trigger('upload', data);
    },
    
    uploadImageError: function(data) {
      var msg = 'Error: the image was not uploaded';
      this.$error.text(msg);
    },

    render: function() {
      return this.$el;
    }
    
  });
});
