/**
 * Jplayer implementation view
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
      //'click .jp-stop': 'ended'
    },
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
        error:               _.bind(this.error, this)
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
      //console.log('jplayer stop'); 
    },
    
    ended: function() {
      //this.hide();
      this.trigger('ended');
    },

    show: function() {
      this.$player.height(270);
      this.$player_container.height('auto');
      this.trigger('show');
    },
    
    hide: function() {
      this.$player_container.height(0);
      //console.log('jplayer hide'); 
      this.trigger('hide'); 
    },
    
    error: function() {
      this.trigger('error');
    }
  });
});
