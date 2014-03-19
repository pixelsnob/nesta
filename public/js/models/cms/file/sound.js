/**
 * Sound model
 * 
 */
define([
  'models/cms/file/base'
], function(FileModel) {
  return FileModel.extend({
    
    url: function() {
      return '/cms/sounds/' + this.id;
    },

    upload_url: '/cms/sounds',

    types: [ 'audio/mp3', 'video/mp4' ],
    
    initialize: function() {
    },
    
    validate: function(attrs, opts) {
      console.log(attrs.file.type);
      if (_.indexOf(this.types, attrs.file.type) === -1) {
        return 'File must be one of: ' + this.types.join(', ');
      }
      /*if (attrs.file.size > 5000000) {
        return 'Audio file size must be less than 5MB';
      }*/
    }
  });
});
