/**
 * File upload base view
 * 
 */
define([
  'views/base',
  'jade'
], function(BaseView, jade) {
  return BaseView.extend({
    
    model: null,
    
    events: {
      'change input[type=file]':   'fileChange',
      'click .upload':             'upload' 
    },

    initialize: function() {
      this.$file_input    = this.$el.find('input[type=file]');
      this.$error         = this.$el.find('.error');
      this.$upload_btn    = this.$el.find('.btn.upload');
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
          file: file,
          src: reader.result
        });
        reader.onload = null;
      };
      reader.readAsDataURL(file);
      return false;
    },
    
    uploadReady: function(model) {
      var obj = this;
      if (model.isValid()) {
        obj.$upload_btn.show();
      } else {
        obj.$error.text(model.validationError);
      }
    },

    upload: function() {
      this.model.upload();
      return false;
    },
    
    success: function(data) {
      this.$error.empty();
      this.$upload_btn.hide();
      // Clear the file input, so that the same filename can be uploaded again
      this.$el.find('form').get(0).reset();
      this.trigger('upload', data);
    },
    
    error: function(data) {
      var msg = 'Error: the file was not uploaded';
      this.$error.text(msg);
    },

    render: function() {
      return this.$el;
    }
    
  });
});
