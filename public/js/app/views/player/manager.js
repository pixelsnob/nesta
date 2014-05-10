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
    el: 'body',
    views: {},
    current_player: null,
    initialize: function(opts) {
      this.$player_container = this.$el.find('#player-container');
      this.views = {
        jplayer: new JplayerView,
        youtube: new YoutubeView
      };
      var obj = this;
      _.each(this.views, function(view) {
        obj.listenTo(view, 'stopped', obj.stopped);
        obj.listenTo(view, 'error', obj.error);
      });
      this.listenTo(this, 'play', this.hideOthers);
    },
     
    render: function(model) {
      return this.$el;
    },
     
    play: function(model) {
      var meta = model.getMeta();
      if (typeof this.views[meta.player] != 'undefined') {
        this.current_view = this.views[meta.player];
        this.current_view.play(model);
        this.hideOthers();
      }
    },
    
    stopped: function() {
      this.trigger('stopped'); 
    },
    
    // Hides all viewers except for the current one
    hideOthers: function() {
      var current_view_cid = (this.current_view ? this.current_view.cid : null);
      _.each(this.views, function(view) {
        if (view.cid != current_view_cid) {
          view.stop();
          view.hide();
        }
      });
    },
    
    error: function() {
      this.trigger('error');
    }
  });
});
