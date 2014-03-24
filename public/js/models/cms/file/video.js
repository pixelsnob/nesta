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

    types: [ 'video/mp4', 'video/webm', 'video/quicktime' ],
    
    validate: function(attrs, opts) {
      if (_.indexOf(this.types, attrs.file.type) === -1) {
        return 'Video must be one of: ' + this.types.join(', ');
      }
      if (attrs.file.size > (100 * 1000 * 1000)) {
        return 'Video size must be less than 50MB';
      }
    }
  });
});
