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
    model: new ImageModel,
    events: {
      'change #image':   'change',
      'click #upload': 'uploadImage' 
    },

    initialize: function() {
      this.setElement($(jade.render('cms_image_upload')));
      this.$file_input = this.$el.find('#image');
      this.$image_preview = this.$el.find('.upload_preview');
      this.$upload_btn = this.$el.find('#upload');
      this.$upload_btn.hide();
    },
    
    change: function(ev) {
      var file      = ev.currentTarget.files[0],
          reader    = new FileReader,
          obj       = this;
      reader.onload = function(ev) {
        obj.$image_preview.show().attr('src', reader.result);
        obj.$upload_btn.show();
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
        /*xhr: function() {  // custom xhr
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // if upload property exists
                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // progressbar
            }
            return myXhr;
        },*/
      });
      return false;
    },
    
    uploadImageSuccess: function(data) {
      this.$image_preview.hide();
      this.$upload_btn.hide();
      console.log(arguments);
    },
    
    uploadImageError: function(data) {
      alert('Error: the image was not uploaded');
    },

    render: function() {
      return this.$el;
    },
    
    remove: function(ev) {
      this.model.destroy();
      return false;
    }
  });
});
