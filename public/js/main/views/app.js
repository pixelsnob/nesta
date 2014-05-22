/**
 * App-level view
 * 
 */
define([
  './base',
  './playlist',
  './slideshow'
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
