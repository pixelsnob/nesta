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
    
    initialize: function() {},
    
    validate: function(attrs, opts) {
      if (attrs.size > 200000) {
        return 'Image size must be less than 200KB';
      }
      if (_.indexOf(this.types, attrs.mime_type) === -1) {
        return 'Image must be one of: ' + this.types.join(', ');
      }
    },

    upload: function() {
      $.ajax({
        url:         '/cms/images',
        type:        'POST',
        success:     _.bind(this.trigger, this, 'upload'),
        error:       _.bind(this.trigger, this, 'error'),
        data:        this.get('data'),
        dataType:    'json',
        cache:       false,
        contentType: false,
        processData: false
      });
    }
  });
});
