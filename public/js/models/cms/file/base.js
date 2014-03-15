/**
 * File base model
 * 
 */
define([
  'models/base'
], function(BaseModel) {
  return BaseModel.extend({
    
    upload_url: null,

    // Allowed mime types
    types: [],
    
    initialize: function() {
    },
    
    upload: function() {
      var form_data = new FormData;
      form_data.append('file', this.get('file'));
      $.ajax({
        url:         this.upload_url,
        type:        'POST',
        success:     _.bind(this.trigger, this, 'upload'),
        error:       _.bind(this.trigger, this, 'error'),
        data:        form_data,
        dataType:    'json',
        cache:       false,
        contentType: false,
        processData: false
      });
    }
  });
});
