/**
 * Audio/video player view
 * 
 */
define([
  'views/base',
  'jplayer'
], function(BaseView, jplayer) {
  return BaseView.extend({
    el: 'body',
    extensions: [ 'mp3', 'm4v', 'mp4', 'webm' ],
    // jPlayer needs the mime type
    extension_map: {
      webm: 'webmv',
      mp4:  'm4v'
    },
    events: {
      'click .pause_play': 'pausePlay',
      'click .stop': 'stop'
    },
    link_selector: function(ext) {
      return 'a[href$=".' + ext + '"]'; 
    },

    initialize: function() {
      this.$player = $('#player').jPlayer({
        supplied: 'mp3,m4v',
        swfPath: "/bower_components/jplayer/jquery.jplayer/Jplayer.swf",
        errorAlerts: false,
        warningAlerts: false,
        ended: _.bind(this.playEnd, this)
      });
      var obj = this;
      _.each(this.extensions, function(ext) {
        // Creates a selector like 'a[href$=".mp3"]' for each extension
        var sel = obj.link_selector(ext);
        obj.$el.find(sel).addClass('pause_play');
      });
    },
     
    pausePlay: function(ev) {
      ev.preventDefault();
      var el = $(ev.currentTarget);
      if (el.hasClass('playing')) {
        this.stop();
        return false;
      }
      this.play(el);
    },

    play: function(el) {
      this.reset();
      this.addPlayIcon(el);
      var href  = el.attr('href'),
          m     = href.match(/\.([a-z0-9]{3,})$/);
      if (m.length < 2) {
        return false;
      }
      var opts = {}, ext;
      if (typeof this.extension_map[m[1]] != 'undefined') {
        ext = this.extension_map[m[1]];
      } else {
        ext = m[1];
      }
      opts[ext] = href;
      this.$player.jPlayer('setMedia', opts);
      this.$player.jPlayer('play');
      el.addClass('playing');
      return false;
    },
    
    // Activated when end of file is reached
    playEnd: function(ev) {
      var next = this.$el.find('a.playing').parent().next().find('.pause_play');
      if (next.length) {
        this.play(next);
      }
    },
    
    addPlayIcon: function(el) {
      $('<span>').addClass('glyphicon glyphicon-play').insertAfter(el)
        .before('&nbsp;');
    },

    stop: function() {
      this.$player.jPlayer('stop');
      this.reset();
    },
    
    reset: function(el) {
      this.$el.find('.playing').removeClass('playing');
      this.$el.find('.glyphicon.glyphicon-play').remove();
    }
  });
});
