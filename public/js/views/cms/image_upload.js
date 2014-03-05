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
      'change #file': 'change'
    },

    initialize: function() {
      this.setElement($(jade.render('cms_image_upload')));
    },
    
    change: function(ev) {
      if (!window.FileReader) {
        alert('Cannot upload. Get a newer browser! :)');
      }
      var file    = ev.currentTarget.files[0],
          reader  = new FileReader;
      xhr = new XMLHttpRequest;
      xhr.open('post', '/cms/images', true);
      /*xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
        }
      }*/
      var fd = new FormData;
      fd.append('fileupload', file);
      xhr.send(fd);
      return false;
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
