/**
 * Jplayer player implementation
 * 
 */
define([
  'views/base',
  'jplayer',
  'jade'
], function(BaseView, jplayer, jade) {
  return BaseView.extend({
    el: 'body',
    events: {
      'click a.close': 'close'
    },

    initialize: function(opts) {
      this.$el.find('#player').append($(jade.render('player/jplayer')));
      this.$player_container = this.$el.find('#jplayer');
      this.$player = this.$el.find('#jplayer .player');
      this.$player.jPlayer({
        supplied:            'mp3',
        swfPath:             '/bower_components/jplayer/jquery.jplayer/' + 
                             'Jplayer.swf',
        cssSelectorAncestor: '.player-ui',
        errorAlerts:         true,
        ended:               _.bind(this.ended, this),
        wmode:               'window',
        error:               _.bind(this.error, this)
      });
    },
    
    render: function() {
      return this.$el;
    },
    
    play: function(model) {
      var opts = {},
          meta = model.getMeta();
      opts[meta.jplayer_type] = model.get('src');
      this.$player.jPlayer('setMedia', opts);
      this.$player.jPlayer('play');
      this.trigger('play');
    },

    stop: function() {
      if (!this.$player.data().jPlayer.status.paused) {
        this.$player.jPlayer('stop');
      }
      this.trigger('stopped');
    },
    
    // No need to show this player: only for audio files
    show: function() {},
    hide: function() {},

    ended: function() {
      this.trigger('stopped');
    },

    error: function() {
      this.trigger('error');
    }
  });
});
