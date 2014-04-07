/**
 * Playlist model. Defines what urls to look for, etc.
 * 
 */
define([
  'models/base'
], function(BaseModel) {
  return BaseModel.extend({
    meta: {
      m4v: {
        media_type:   'video',
        player:       'jplayer',
        jplayer_type: 'm4v',
        sel:          'a[href$=".m4v"]'
      },
      mp4: {
        media_type:   'video',
        player:       'jplayer',
        jplayer_type: 'm4v',
        sel:          'a[href$=".mp4"]'
      },
      webm: {
        media_type:   'video',
        player:       'jplayer',
        jplayer_type: 'webmv',
        sel:          'a[href$=".webm"]'
      },
      mp3: {
        media_type:   'audio',
        player:       'jplayer',
        jplayer_type: 'mp3',
        sel:          'a[href$=".mp3"]'
      },
      youtube: {
        media_type:   'video',
        player:       'youtube',
        sel:          'a[href*="youtube.com"]'
      }
    },
    initialize: function() {
      BaseModel.prototype.initialize.apply(this);
    }
  });
});

