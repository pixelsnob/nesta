/**
 * Image model
 * 
 */
define([
  './base'
], function(FileModel) {
  return FileModel.extend({
    
    url: function() {
      return '/cms/images/' + this.id;
    },

    upload_url: '/cms/images',

    types: [ 'image/jpeg', 'image/png' ],
    
    validate: function(attrs, opts) {
      if (_.indexOf(this.types, attrs.file.type) === -1) {
        return 'Image must be one of: ' + this.types.join(', ');
      }
      if (attrs.file.size > 200000) {
        return 'Image size must be less than 200KB';
      }
    }
  });
});
