/**
 * Audio player view
 * 
 */
define([
  'views/base',
  'modules/jplayer'
], function(BaseView, jplayer) {
  return BaseView.extend({
    el: 'body',
    events: {
      'click a.sound': 'play'
    },
    
    initialize: function() {
      this.$player = this.$el.find('#player'); 
    },
     
    play: function(ev) {
      ev.preventDefault();
      var el = $(ev.currentTarget);
      if (el.hasClass('playing')) {
        return false;
      }
      this.$el.find('.playing').removeClass('playing');
      el.addClass('playing');
      this.$player.jPlayer('setMedia', { mp3: el.attr('href') });
      this.$player.jPlayer('play');
      return false;
    }
  });
});
