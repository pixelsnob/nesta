/**
 * App-level view
 * 
 */
define([
  'views/base',
  'views/playlist',
  'views/jplayer'
], function(BaseView, PlayListView, PlayerView) {
  return BaseView.extend({
    el: 'body',
    events: {
      
    },
    initialize: function() {
      this.player_view = new PlayerView({ el: this.$el });
      this.playlist_view = new PlayListView({ player_view: this.player_view });
    }
  });
});
