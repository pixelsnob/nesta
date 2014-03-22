/**
 * Video model
 * 
 */
define([
  'models/cms/file/base'
], function(FileModel) {
  return FileModel.extend({
    
    url: function() {
      return '/cms/videos/' + this.id;
    },

    upload_url: '/cms/videos',

    types: [ 'video/mp4', 'video/webm' ],
    
    validate: function(attrs, opts) {
      if (_.indexOf(this.types, attrs.file.type) === -1) {
        return 'Video must be one of: ' + this.types.join(', ');
      }
      if (attrs.file.size > 50000000) {
        return 'Video size must be less than 50MB';
      }
    }
  });
});
