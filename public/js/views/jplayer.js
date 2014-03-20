/**
 * Audio/video player view
 * 
 */
define([
  'views/base',
  'modules/jplayer'
], function(BaseView, jplayer) {
  return BaseView.extend({
    el: 'body',
    extensions: [ 'mp3', 'm4v', 'mp4' ],
    events: {},

    initialize: function() {
      var obj = this;
      _.each(this.extensions, function(ext) {
        // Creates a selector like 'a[href$=".mp3"]' for each extension
        obj.events['click a[href$=".' + ext + '"]'] = 'play';
      });
      this.$player = this.$el.find('#player'); 
      this.$player.on($.jPlayer.event.ended, _.bind(this.playEnd, this));
    },
     
    play: function(ev) {
      ev.preventDefault();
      var el = $(ev.currentTarget);
      if (el.hasClass('playing')) {
        this.$player.jPlayer('stop');
        this.reset(el);
        return false;
      }
      this.reset();
      var href  = el.attr('href'),
          m     = href.match(/\.([a-z0-9]{3})$/);
      if (m.length < 2) {
        return false;
      }
      var opts = {};
      // { mp3: href }, etc.
      if (m[1] == 'mp4') {
        opts['m4v'] = href;
      } else {
        opts[m[1]] = href;
      }
      this.$player.jPlayer('setMedia', opts);
      this.$player.jPlayer('play');
      el.addClass('playing');
      return false;
    },

    // Activated when end of file is reached
    playEnd: function(ev) {
      var next = this.$el.find('a.playing').parent().next()
        .find(this.sound_sel);
      this.reset();
      if (next.length) {
        this.$player.jPlayer('setMedia', { mp3: next.attr('href') });
        this.$player.jPlayer('play');
        next.addClass('playing');
      }
    },

    reset: function(el) {
      el = (typeof el != 'undefined' ? el : this.$el.find('.playing'));
      el.removeClass('playing');
    }
  });
});
