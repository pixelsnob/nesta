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
      this.$progress      = this.$el.find('.upload_progress');
      this.listenTo(this.model, 'upload', this.success);
      this.listenTo(this.model, 'progress', this.uploadProgress);
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
        //obj.$upload_btn.show();
      };
      reader.readAsDataURL(file);
      return false;
    },
    
    uploadReady: function(model) {
      var obj = this;
      if (model.isValid()) {
        //obj.$upload_btn.show().prop('disabled', false);
      } else {
        obj.$error.text(model.validationError);
        obj.$upload_btn.hide();
      }
    },
    
    upload: function() {
      this.model.upload();
      this.$progress.show();
      return false;
    },

    uploadProgress: function(pct) {
      this.$progress.text(pct + '% uploaded');
      var obj = this;
      if (pct == 100) {
        this.$progress.text('Done');
        window.setTimeout(function() {
          obj.$progress.fadeOut();
        }, 4000);
      }
    },
    
    success: function(data) {
      this.$error.empty();
      this.$upload_btn.hide();
      // Clear the file input, so that the same filename can be uploaded again
      this.$el.find('form').get(0).reset();
      this.trigger('upload', data);
      this.render();
    },
    
    error: function(data) {
      var msg = 'Error: the file was not uploaded';
      this.$error.text(msg);
      //this.$upload_btn.prop('disabled', false);
    },
    
    render: function() {
      return this.$el;
    }
    
  });
});
