/**
 * File upload base view
 * 
 */
define([
  '../base',
  'template'
], function(BaseView, template) {
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
        // ?????
        obj.model.trigger('change', obj.model);
        reader.onload = null;
      };
      reader.readAsDataURL(file);
      return false;
    },
    
    uploadReady: function(model) {
      if (model.isValid()) {
        this.$upload_btn.show(); 
      } else {
        this.$error.text(model.validationError);
        this.$upload_btn.hide();
      }
    },
    
    upload: function() {
      this.model.upload();
      this.$progress.show();
      this.$upload_btn.hide();
      this.$error.empty();
      this.$file_input.hide();
      return false;
    },

    uploadProgress: function(pct) {
      this.$progress.text(pct + '% uploaded');
    },
    
    success: function(data) {
      // Clear the file input, so that the same filename can be uploaded again
      this.$el.find('form').get(0).reset();
      this.trigger('upload', data);
      this.$progress.hide();
      this.$file_input.show();
    },
    
    error: function(data) {
      var msg = 'Error: the file was not uploaded';
      this.$error.text(msg);
      this.$progress.hide();
      this.$file_input.show();
      this.$upload_btn.show();
    },
    
    render: function() {
      return this.$el;
    },

    abort: function() {
      this.model.abort();
    }
    
  });
});
