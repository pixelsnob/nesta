/**
 * Playlist item (video or audio) model
 * 
 */
define([
  'models/base'
], function(BaseModel) {
  return BaseModel.extend({
    extensions: {
      video: [ 'm4v', 'mp4', 'webm' ],
      audio: [ 'mp3' ]
    },
    extension_map: {
      webm: 'webmv',        
      mp4:  'm4v'
    },
    initialize: function() {
      BaseModel.prototype.initialize.apply(this);
    },
    
    get: function(attr) {
      switch (attr) {
        case 'file_type':
          return this.getFileType();
          break;
        case 'jplayer_type':
          return this.getJplayerType();    
          break;
        default:
          return BaseModel.prototype.get.call(this, attr);
      }
    },

    getJplayerType: function() {
      var ext = this.getExtension();
      if (typeof this.extension_map[ext] != 'undefined') {
        return this.extension_map[ext];
      } else {
        return ext;
      }
    },

    getFileType: function() {
      var ext = this.getExtension();
      if (_.contains(this.extensions['video'], ext)) {
        return 'video';
      } else if (_.contains(this.extensions['audio'], ext)) {
        return 'audio';
      }
    },

    getExtension: function() {
      var src  = this.get('src'),
          m    = src.match(/\.([a-z0-9]{3,5})$/);
      if (typeof m[1] != 'undefined') {
        return m[1];
      }
    }
  });
});

