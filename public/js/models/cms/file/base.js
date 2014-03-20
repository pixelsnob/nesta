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
      var xhr = $.ajax({
        url:         this.upload_url,
        type:        'POST',
        success:     _.bind(this.trigger, this, 'upload'),
        error:       _.bind(this.trigger, this, 'error'),
        data:        form_data,
        dataType:    'json',
        cache:       false,
        contentType: false,
        processData: false,
        xhr:         _.bind(this.xhr, this)
      });
    },

    xhr: function() {
      var xhr = new XMLHttpRequest,
          obj = this;
      xhr.upload.addEventListener('progress', function(ev) {  
        if (ev.lengthComputable) {
          var pct = ev.loaded / ev.total;
          obj.trigger('progress', parseInt(pct * 100));
        }
      });
      return xhr;
    }
  });
});
