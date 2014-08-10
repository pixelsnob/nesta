/**
 * Jplayer player implementation
 * 
 */
define([
  '../base',
  'jplayer',
  'jade'
], function(BaseView, jplayer, jade) {
  return BaseView.extend({
    el: '#players',
    events: {
      'click #jplayer .jp-stop': 'stopped',
      //'click #jplayer .jp-pause': 'paused',
      'click #jplayer .jp-play': 'playing'
    },

    initialize: function(opts) {
      this.$el.append($(jade.render('player/jplayer')));
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
        error:               _.bind(this.error, this),
        ready:               _.bind(this.ready, this)
      });
    },
    
    ready: function() {
      this.trigger('ready');
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
      this.show();
    },

    stop: function() {
      if (!this.$player.data().jPlayer.status.paused) {
        this.$player.jPlayer('stop');
      }
      //this.stopped();
      //console.log('stop');
      this.hide();
    },
    
    // Hack: hitting the "stop" link in jplayer ui doesn't trigger "ended"
    stopped: function() {
      this.trigger('stopped');
      this.$player.jPlayer('clearMedia');
      this.hide();
    },
    
    /*paused: function() {
      //console.log('paused');
    },*/
    
    playing: function() {
      this.trigger('playing');
    },

    show: function() {
      this.$player_container.height('auto');
    },

    hide: function() {
      this.$player_container.height(0);
    },

    ended: function() {
      this.trigger('ended');
      this.hide();
    },

    error: function() {
      this.trigger('error');
    }
  });
});
