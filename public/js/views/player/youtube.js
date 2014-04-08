/**
 * Youtube player implementation
 * 
 */
define([
  'views/player/base',
  'youtube',
  'jade'
], function(PlayerView, YT, jade) {
  return PlayerView.extend({
    el: 'body',
    initialize: function(opts) {
      this.$el.find('#player').append($(jade.render('player/youtube')));
      this.$player_container = this.$el.find('#youtube');
    },

    play: function(model) {
      var iframe = $('<iframe>').attr({
        id: 'youtube-iframe',
        src: 'https:' + model.get('src') + '?enablejsapi=1&autoplay=1&html5=1',
        width: 480,
        height: 270,
        frameborder: 0
      });
      this.$player = this.$el.find('#youtube .player').empty().append(iframe);
      this.player = new YT.Player('youtube-iframe', {
        events: {
          //'onReady': _.bind(this.show, this),
          //'onStateChange': _.bind(this.change, this)
        }
      });
      this.show();
      this.trigger('play');
    },
    
    stop: function() {
      if (this.player) {
        this.player.stopVideo();
      }
    }
    
  });
});
