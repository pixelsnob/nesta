/**
 * 
 */
define([
  'views/base',
  'youtube',
  'jade'
], function(BaseView, YT) {
  return BaseView.extend({
    events: {
      'click .jp-stop': 'ended'
    },
    initialize: function(opts) {
      var obj = this;
      /*onYouTubeIframeAPIReady = function() {
        obj.player = new YT.Player('player', {
          height: '390',
          width: '640',
          //videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': _.bind(obj.ready, this)
            //'onStateChange': onPlayerStateChange
          }
        });
      };*/
    },
    
    ready: function(ev) {
      //ev.target.playVideo();
    },
    
    play: function(model) {
      this.player = new YT.Player('player', {
        height: '390',
        width: '640',
        //videoId: 'M7lc1UVf-VE',
        events: {
          //'onReady': _.bind(obj.ready, this)
          //'onStateChange': onPlayerStateChange
        }
      });
      this.player.loadVideoByUrl(model.get('src'));
    },

    render: function(model) {
    }
    
  });
});
