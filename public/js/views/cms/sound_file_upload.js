/**
 * Sound file upload view
 * 
 */
define([
  'backbone',
  'models/cms/sound_file',
  'jade'
], function(Backbone, SoundFileModel, jade) {
  return Backbone.View.extend({
    events: {
      'change input[type=file]':   'change',
      'click .upload':             'uploadFile' 
    },

    initialize: function() {
      this.setElement($(jade.render('cms/sound_file_upload')));
      this.$file_input    = this.$el.find('input[type=file]');
      this.$error         = this.$el.find('.error');
      this.$upload_btn = this.$el.find('.btn.upload');
      this.$upload_btn.hide();
    },
    
    change: function(ev) {
      var file      = ev.currentTarget.files[0],
          reader    = new FileReader,
          obj       = this,
          types     = [ 'audio/mp3' ];
      this.$error.empty();
      reader.onload = function(ev) {
        console.log(file.type);
        if (_.indexOf(types, file.type) == -1) {
          var msg = 'File must be one of: ' + types.join(', ');
          return obj.$error.text(msg);
        }
        var size     = Math.round(file.size / 10000),
            max_size = 10;
        if (size > 200) {
          var msg = 'File size must be less than ' + max_size + 'MB';
          return obj.$error.text(msg);
        }
        obj.$upload_btn.show();
        reader.onload = null;
      };
      reader.readAsDataURL(file);
      return false;
    },
    
    uploadFile: function(form_data) {
      var file      = this.$file_input.get(0).files[0],
          form_data = new FormData;
      form_data.append('image', file);
      $.ajax({
        url:         '/cms/sounds',
        type:        'POST',
        success:     _.bind(this.uploadSuccess, this),
        error:       _.bind(this.uploadError, this),
        data:        form_data,
        dataType:    'json',
        cache:       false,
        contentType: false,
        processData: false
      });
      return false;
    },
    
    uploadSuccess: function(data) {
      this.$error.empty();
      this.$upload_btn.hide();
      // Clear the file input, so that the same filename can be uploaded again
      this.$el.find('form').get(0).reset();
      this.trigger('upload', data);
    },
    
    uploadError: function(data) {
      var msg = 'Error: the file was not uploaded';
      this.$error.text(msg);
    },

    render: function() {
      return this.$el;
    }
    
  });
});
