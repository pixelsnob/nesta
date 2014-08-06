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
      return;
      this.$el.find('.content-block .content a').each(function(i) {
        var regex = new RegExp('^https?:\/\/([^\/]*)'),
            m     = $(this).attr('href').match(regex);
        if (m && typeof m[1] != 'undefined' && m[1] !=
            window.location.hostname) {
          $(this).attr('target', '_blank');
        }
      });
    }
  });
});
