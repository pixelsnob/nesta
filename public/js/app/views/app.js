/**
 * App-level view
 * 
 */
define([
  'views/base',
  'views/playlist',
  'views/slideshow'
], function(BaseView, PlayListView, SlideshowView) {
  return BaseView.extend({
    el: 'body',
    events: {
      
    },
    initialize: function() {    
      this.playlist_view = new PlayListView({
        player_view: this.player_view
      });
      this.slideshow_view = new SlideshowView;
    }
  });
});
