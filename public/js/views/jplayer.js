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
    },
     
    render: function(model) {
      if (model.get('file_type') == 'video') {
        this.$player_container.show();
      } else {
        this.$player_container.hide();
      }
      // jPlayer's flash solution doesn't like to be hidden, so destroy
      // old instance and create new one
      this.$player.jPlayer('destroy');
      this.$player.jPlayer({
        supplied:            'mp3,m4v',
        swfPath:             '/bower_components/jplayer/jquery.jplayer/' + 
                             'Jplayer.swf',
        cssSelectorAncestor: '#player-ui',
        errorAlerts:         true,
        ready:               _.bind(this.ready, this, model),
        ended:               _.bind(this.ended, this),
        wmode:               'window'
        //warningAlerts:     true,
        //error:             _.bind(this.jplayerError, this)
      });
      return this.$el;
    },
     
    ready: function(model) {
      var opts = {};
      opts[model.get('jplayer_type')] = model.get('src');
      this.$player.jPlayer('setMedia', opts).jPlayer('play');
    },
    
    stop: function() {
      this.$player.jPlayer('stop');
      this.$player_container.hide();
      this.trigger('stop');
    },
    
    ended: function() {
      this.$player.jPlayer('stop');
      this.$player_container.hide();
      this.trigger('ended');
    }
  });
});
