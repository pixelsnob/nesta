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
    },
    
    change: function(ev) {
      var file      = ev.currentTarget.files[0],
          reader    = new FileReader,
          obj       = this;
      reader.onload = function(ev) {
        obj.$el.find('.upload_preview').attr('src', reader.result);
      };
      reader.readAsDataURL(file);
      return false;
    },
    
    uploadImage: function(form_data) {
      var file      = this.$file_input.get(0).files[0],
          form_data = new FormData;
      form_data.append('image', file);
      $.ajax({
        url: '/cms/images',
        type: 'POST',
        /*xhr: function() {  // custom xhr
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // if upload property exists
                myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // progressbar
            }
            return myXhr;
        },*/
        success: function(data) {
          console.log('ok'); 
        },
        error: function(data) {
        
        },
        data: form_data,
        cache: false,
        contentType: false,
        processData: false
      });
    },

    render: function() {
      //this.$el.find('.image_upload').clear();
      //this.$el.find('.image_upload').html(form.render());
      return this.$el;
    },
    
    remove: function(ev) {
      this.model.destroy();
      return false;
    }
  });
});
