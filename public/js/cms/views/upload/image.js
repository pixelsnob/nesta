/**
 * Image upload view
 * 
 */
define([
  './base',
  '../../models/file/image',
  'template'
], function(UploadView, ImageModel, template) {
  return UploadView.extend({
    
    model: new ImageModel,

    initialize: function() {
      this.setElement(template.render('cms/image_upload'));
      this.$image_preview = this.$el.find('.upload_preview img');
      this.$image_preview.hide();
      UploadView.prototype.initialize.apply(this);
    },
    
    uploadReady: function(model) {
      var img = new Image,
          obj = this;
      if (model.isValid()) {
        img.onload = function() {
          obj.$image_preview.show().attr('src', img.src);
          obj.$upload_btn.show();
        };
        img.src = model.get('src');
      } else {
        obj.$error.text(model.validationError);
      }
    },
    
    success: function(data) {
      UploadView.prototype.success.call(this, data);
      this.$image_preview.hide();
    }
    
  });
});
