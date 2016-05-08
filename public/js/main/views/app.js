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
      this.playlist_view = new PlayListView;
      this.slideshow_view = new SlideshowView;
    }
  });
});
