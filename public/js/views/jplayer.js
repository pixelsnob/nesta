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
    events: {
      'click .jp-stop': 'ended'
    },
    initialize: function(opts) {
      this.$player_container = this.$el.find('#player-container');
      this.$player_container.append($(jade.render('player')));
      this.$player = this.$el.find('#player');
      this.$player.jPlayer({
        supplied:            'mp3,m4v',
        swfPath:             '/bower_components/jplayer/jquery.jplayer/' + 
                             'Jplayer.swf',
        cssSelectorAncestor: '#player-ui',
        errorAlerts:         false,
        ended:               _.bind(this.stop, this),
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
        this.$player_container.height('auto');
        this.$player.height('auto');
      } else {
        this.$player_container.height(0);
        this.$player.height(0);
      }
      this.$player.jPlayer('play');
    },
    
    stop: function() {
      this.$player.jPlayer('stop');
      this.ended();
    },
    
    ended: function() {
      this.$player_container.height(0);
      this.$player.height(0);
      this.$player.jPlayer('clearMedia');
      this.trigger('ended');
    },
    
    /*paused: function(ev) {
      //console.log(this.$player.data().jPlayer.status);
      if (!this.$player.data().jPlayer.status.currentTime) {
        this.stop();
      }
    },*/

    error: function() {
      this.trigger('error');
    }
  });
});
