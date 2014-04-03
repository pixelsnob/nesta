/**
 * Audio/video player view
 * 
 */
define([
  'views/base',
  'models/playlist_item',
  'jplayer',
  'jade'
], function(BaseView, PlaylistItemModel, jplayer) {
  return BaseView.extend({
    model: PlaylistItemModel,
    initialize: function(opts) {
      this.$player_container = this.$el.find('#player-container');
      this.$player_container.append($(jade.render('player')));
      this.$player = this.$el.find('#player');
      this.$player.jPlayer({
        supplied:            'mp3,m4v',
        swfPath:             '/bower_components/jplayer/jquery.jplayer/' + 
                             'Jplayer.swf',
        cssSelectorAncestor: '#player-ui',
        errorAlerts:         true,
        //warningAlerts:     true,
        //ready:               _.bind(this.ready, this, model),
        ended:               _.bind(this.ended, this),
        wmode:               'window',
        error:               _.bind(this.error, this)
      });
    },
     
    render: function(model) {
      return this.$el;
    },
     
    play: function(model) {
      var opts = {};
      opts[model.get('jplayer_type')] = model.get('src');
      this.$player.jPlayer('setMedia', opts);
      if (model.get('file_type') == 'video') {
        var jplayer_status  = this.$player.data().jPlayer.status,
            h               = jplayer_status.height,
            w               = jplayer_status.width;
        this.$player_container.css('height', 'auto');
        this.$player.height(h).width(w);
      } else {
        this.$player_container.height(0);
        this.$player.height(0);
      }
      this.$player.jPlayer('play');
    },
    
    stop: function() {
      this.$player_container.height(0);
      this.$player.height(0);
      this.$player.jPlayer('stop');
      this.$player.jPlayer('clearMedia');
      this.trigger('stop');
    },
    
    ended: function() {
      this.$player_container.height(0);
      this.$player.height(0);
      this.$player.jPlayer('clearMedia');
      this.trigger('ended');
    },

    error: function() {
      this.trigger('error');
    }
  });
});
