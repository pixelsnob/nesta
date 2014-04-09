/**
 * Jplayer player implementation
 * 
 */
define([
  'views/player/base',
  'jplayer',
  'jade'
], function(PlayerView, jplayer, jade) {
  return PlayerView.extend({
    el: 'body',
    initialize: function(opts) {
      this.$el.find('#player').append($(jade.render('player/jplayer')));
      this.$player_container = this.$el.find('#jplayer');
      this.$player = this.$el.find('#jplayer .player');
      this.$player.jPlayer({
        supplied:            'mp3,m4v',
        swfPath:             '/bower_components/jplayer/jquery.jplayer/' + 
                             'Jplayer.swf',
        cssSelectorAncestor: '.player-ui',
        errorAlerts:         true,
        //ready:               _.bind(this.ready, this),
        ended:               _.bind(this.ended, this),
        wmode:               'window',
        error:               _.bind/(this.error, this),
        size:                { width: 600 }
      });
    },
    
    render: function() {
      return this.$el;
    },
    
    play: function(model) {
      var opts = {},
          meta = model.get('meta');
      opts[meta.jplayer_type] = model.get('src');
      this.$player.jPlayer('setMedia', opts);
      this.$player.jPlayer('play');
      if (meta.media_type == 'video') {
        this.show();
      } else {
        this.hide();
      }
      this.trigger('play');
    },

    stop: function() {
      if (!this.$player.data().jPlayer.status.paused) {
        this.$player.jPlayer('stop');
      }
    },
    
    error: function() {
      this.trigger('error');
    }
  });
});
