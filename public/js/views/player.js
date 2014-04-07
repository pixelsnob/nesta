/**
 * Audio/video player view
 * 
 */
define([
  'views/base',
  'views/player/jplayer',
  'views/player/youtube',
  'jade'
], function(
  BaseView,
  JplayerView,
  YoutubeView,
  jade
) {
  return BaseView.extend({
    views: {},
    current_player: null,
    initialize: function(opts) {
      this.$player_container = this.$el.find('#player-container');
      var obj = this;
      this.views = {
        jplayer: new JplayerView,
        youtube: new YoutubeView
      };
      _.each(this.views, function(view) {
        obj.listenTo(view, 'ended', obj.ended);
        obj.listenTo(obj, 'play', obj.hideOthers);
      });
    },
     
    render: function(model) {
      return this.$el;
    },
     
    play: function(model) {
      var meta = model.get('meta');
      if (typeof this.views[meta.player] != 'undefined') {
        this.views[meta.player].play(model);
        this.current_view = this.views[meta.player];
        this.trigger('play');
      }
    },
    
    stop: function() {
    },
    
    hideOthers: function() {
      var current_view_cid = (this.current_view ? this.current_view.cid : null);
      obj = this;
      _.each(this.views, function(view) {
        if (view.cid != current_view_cid) {
          view.stop();
          view.hide();
        }
      });
    },
    
    ended: function() {
      this.trigger('ended');
    },
    
    error: function() {
    }
  });
});
