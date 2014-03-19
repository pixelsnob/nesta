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
    sound_sel: 'a[href$=".mp3"], a[href$=".m4v"]',
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
        this.$player.jPlayer('stop');
        $(el).removeClass('playing');
        return false;
      }
      this.$el.find('.playing').removeClass('playing');
      var href  = el.attr('href'),
          m     = href.match(/\.(mp3|m4v)$/);
      if (m.length < 2) {
        return false;
      }
      var opts = {};
      opts[m[1]] = href;
      this.$player.jPlayer('setMedia', opts);
      this.$player.jPlayer('play');
      el.addClass('playing');
      return false;
    },

    playEnd: function(ev) {
      var next = this.$el.find('a.playing').parent().next()
        .find(this.sound_sel);
      this.$el.find('.playing').removeClass('playing');
      if (next.length) {
        this.$player.jPlayer('setMedia', { mp3: next.attr('href') });
        this.$player.jPlayer('play');
        next.addClass('playing');
      }
    }
  });
});
