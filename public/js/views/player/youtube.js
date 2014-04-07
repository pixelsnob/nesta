/**
 * 
 */
define([
  'views/base',
  'youtube',
  'jade'
], function(BaseView, YT) {
  return BaseView.extend({
    el: 'body',
    events: {
    },
    initialize: function(opts) {
      this.$el.find('#player').append($(jade.render('player/youtube')));
      this.$player_container = this.$el.find('#youtube');
    },
    
    ready: function(ev) {
      //ev.target.playVideo();
    },

    ended: function() {
      this.hide();
      this.trigger('ended');
    },

    show: function() {
      this.$player_container.height('auto');
      //this.trigger('show');
    },
    
    hide: function() {
      this.$player_container.height(0);
      //this.trigger('hide');
    },
    
    play: function(model) {
      var iframe = $('<iframe>').attr({
        id: 'youtube-iframe',
        src: 'https:' + model.get('src') + '?enablejsapi=1&autoplay=1',
        width: 480,
        height: 270,
        frameborder: 0
      });
      this.$player = this.$el.find('#youtube .player').empty().append(iframe);
      this.player = new YT.Player('youtube-iframe', {
        events: {
          'onReady': _.bind(this.ready, this),
          'onStateChange': _.bind(this.change, this)
        }
      });
      this.show();
      this.trigger('play');
    },
     
    stop: function() {
      if (this.player) {
        this.player.stopVideo();
      }
    },
    
    ended: function() {
      this.hide();
      this.trigger('ended');
    },

    change: function(ev) {
      //console.log(ev);
    },

    error: function(ev) {
      //console.log(ev);
    }
    
  });
});
