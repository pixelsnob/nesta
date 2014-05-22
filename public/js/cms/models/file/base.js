/**
 * File base model
 * 
 */
define([
  '../base'
], function(BaseModel) {
  return BaseModel.extend({
    
    upload_url: null,

    // Allowed mime types
    types: [],
    
    initialize: function() {
    },
    
    xhr: null,

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
        processData: false,
        xhr:         _.bind(this.createXhr, this)
      });
    },

    createXhr: function() {
      this.xhr = new XMLHttpRequest;
      obj = this;
      this.xhr.upload.addEventListener('progress', function(ev) {  
        if (ev.lengthComputable) {
          var pct = ev.loaded / ev.total;
          obj.trigger('progress', parseInt(pct * 100));
        }
      });
      return this.xhr;
    },

    abort: function() {
      if (this.xhr) {
        this.xhr.abort();
      }
    }
  });
});
