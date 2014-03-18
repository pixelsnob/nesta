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
    sound_sel: 'a[href$=".mp3"]',
    events: {},

    initialize: function() {
      this.events['click ' + this.sound_sel] = 'play';
      this.$player = this.$el.find('#player'); 
      this.$player.on($.jPlayer.event.ended, _.bind(this.playEnd, this));
    },
     
    play: function(ev) {
      ev.preventDefault();
      var el = $(ev.currentTarget);
      if (el.hasClass('playing')) {
        return false;
      }
      this.$el.find('.playing').removeClass('playing');
      this.$player.jPlayer('setMedia', { mp3: el.attr('href') });
      this.$player.jPlayer('play');
      el.addClass('playing');
      return false;
    },

    playEnd: function(ev) {
      var next = this.$el.find('a.playing').parent().next()
        .find(this.sound_sel);
      if (next.length) {
        this.$player.jPlayer('setMedia', { mp3: next.attr('href') });
        this.$player.jPlayer('play');
        this.$el.find('.playing').removeClass('playing');
        next.addClass('playing');
      }
    }
  });
});
