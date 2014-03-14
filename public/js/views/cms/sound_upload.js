/**
 * Sound upload view
 * 
 */
define([
  'views/base',
  'models/cms/sound',
  'jade'
], function(BaseView, SoundModel, jade) {
  return BaseView.extend({
    
    model: new SoundModel,

    events: {
      'change input[type=file]':   'fileChange',
      'click .upload':             'upload' 
    },

    initialize: function() {
      this.setElement($(jade.render('cms/sound_upload')));
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
          mime_type: file.type,
          size: file.size
        });
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
      }
    },

    upload: function(form_data) {
      var file      = this.$file_input.get(0).files[0],
          form_data = new FormData;
      form_data.append('sound', file);
      this.model.set('data', form_data);
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
      var msg = 'Error: the sound was not uploaded';
      this.$error.text(msg);
    },

    render: function() {
      return this.$el;
    }
    
  });
});


