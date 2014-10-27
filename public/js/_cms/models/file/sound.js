/**
 * Sound model
 * 
 */
define([
  './base'
], function(FileModel) {
  return FileModel.extend({
    
    url: function() {
      return '/cms/sounds/' + this.id;
    },

    upload_url: '/cms/sounds',

    types: [ 'audio/mp3' ],
    
    initialize: function() {
    },
    
    validate: function(attrs, opts) {
      if (!attrs.file.name.match(/^[a-z0-9\-\._]+$/i)) {
        return 'Illegal characters';
      }
      if (_.indexOf(this.types, attrs.file.type) === -1) {
        return 'File must be one of: ' + this.types.join(', ');
      }
      if (attrs.file.size > 5000000) {
        return 'Audio file size must be less than 5MB';
      }
    }
  });
});
