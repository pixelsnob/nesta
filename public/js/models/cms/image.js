/**
 * Image model
 * 
 */
define([
  'models/base'
], function(BaseModel) {
  return BaseModel.extend({
    
    url: function() {
      return '/cms/images/' + this.id;
    },

    types: [ 'image/jpeg', 'image/png' ],
    
    initialize: function() {
    },
    
    validate: function(attrs, opts) {
      if (attrs.file.size > 200000) {
        return 'Image size must be less than 200KB';
      }
      if (_.indexOf(this.types, attrs.file.type) === -1) {
        return 'Image must be one of: ' + this.types.join(', ');
      }
    },

    upload: function() {
      var form_data = new FormData;
      form_data.append('file', this.get('file'));
      $.ajax({
        url:         '/cms/images',
        type:        'POST',
        success:     _.bind(this.uploadSuccess, this),
        error:       _.bind(this.trigger, this, 'error'),
        data:        this.get('data'),
        dataType:    'json',
        cache:       false,
        contentType: false,
        processData: false
      });
    },

    uploadSuccess: function(data) {
      this.trigger('upload', data);
    }
  });
});
