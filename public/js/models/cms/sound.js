/**
 * Sound model
 * 
 */
define([
  'models/base'
], function(BaseModel) {
  return BaseModel.extend({
    
    url: function() {
      return '/cms/sounds/' + this.id;
    },

    types: [ 'audio/mpeg', 'audio/mp3' ],
    
    initialize: function() {},
    
    validate: function(attrs, opts) {
      if (attrs.size > 5000000) {
        return 'Sound file size must be less than 5MB';
      }
      if (_.indexOf(this.types, attrs.mime_type) === -1) {
        return 'Sound file must be one of: ' + this.types.join(', ');
      }
    },

    upload: function() {
      $.ajax({
        url:         '/cms/sounds',
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
