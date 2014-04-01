/**
 * App-level view
 * 
 */
define([
  'views/base',
  'views/playlist',
  'views/jplayer'
], function(BaseView, PlayListView, JplayerView) {
  return BaseView.extend({
    el: 'body',
    events: {
      
    },
    initialize: function() {
      this.player_view = new JplayerView({ el: this.$el });
      this.playlist_view = new PlayListView;
      this.listenTo(this.playlist_view, 'play', _.bind(
        this.player_view.render, this.player_view));
      this.listenTo(this.playlist_view, 'stop', _.bind(
        this.player_view.stop, this.player_view));
      this.listenTo(this.player_view, 'ended', _.bind(
        this.playlist_view.next, this.playlist_view));
    }
  });
});
