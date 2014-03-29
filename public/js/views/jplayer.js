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
    extensions: {
      video: [ 'm4v', 'mp4', 'webm' ],
      audio: [ 'mp3' ]
    },
    extension_map: {
      webm: 'webmv',        
      mp4:  'm4v'
    },
    events: {
      'click .pause_play':  'play',
      'click .stop':        'stop',
      'click .jp-stop':     'stop',
      'click .previous':    'previous',
      'click .next':        'next'
    },
    link_selector: function(ext) {
      return 'a[href$=".' + ext + '"]'; 
    },

    initialize: function() {
      this.$player = $('#player').jPlayer({
        supplied: 'mp3,m4v',
        swfPath: '/bower_components/jplayer/jquery.jplayer/Jplayer.swf',
        cssSelectorAncestor: '#player-ui',
        errorAlerts: true,
        //warningAlerts: true,
        progress: function(o) {
          console.log(o.jPlayer.status.seekPercent);
        },
        ended: _.bind(this.jplayerPlayEnd, this),
        error: _.bind(this.jplayerError, this)
      });
      this.$player_container = this.$el.find('#player-container');
      this.$player_container.hide();
      var obj = this;
      _.each(this.extensions, function(extensions, type) {
        _.each(extensions, function(ext) {
          // Creates a selector like 'a[href$=".mp3"]' for each extension
          var sel = obj.link_selector(ext);
          obj.$el.find(sel).addClass('pause_play').data('type', type);
        });
      });
    },
    
    jplayerPlayEnd: function(ev) {
      var next = this.$el.find('a.playing').parent().next().find('.pause_play');
      if (next.length) {
        this.next();
      } else {
        this.stop();
      }
    },
    
    jplayerError: function(err) {
      this.reset();
    },

    play: function(ev) {
      ev.preventDefault();
      var el = $(ev.currentTarget);
      if (el.hasClass('playing')) {
        this.stop();
        return false;
      }
      this.playHref(el);
    },
    
    playHref: function(el) {
      this.reset();
      this.addPlayIcon(el);
      var href  = el.attr('href'),
          m     = href.match(/\.([a-z0-9]{3,5})$/);
      if (m.length < 2) {
        return false;
      }
      var opts = {}, ext;
      if (typeof this.extension_map[m[1]] != 'undefined') {
        ext = this.extension_map[m[1]];
      } else {
        ext = m[1];
      }
      //console.log('?');
      opts[ext] = href;
      this.$player.jPlayer('setMedia', opts);
      this.$player.jPlayer('play');
      this.$el.find('.current').removeClass('current');
      el.addClass('playing').addClass('current');
      if (el.data('type') == 'video') {
        this.$player_container.fadeIn(1000);
      }
      return false;
    },
    
    previous: function() {
      var previous = this.$el.find('a.playing').parent().prev()
        .find('.pause_play');
      if (previous.length) {
        this.playHref(previous);
      }
    },

    next: function() {
      var next = this.$el.find('a.playing').parent().next()
        .find('.pause_play');
      if (next.length) {
        this.playHref(next);
      }
    },
    
    addPlayIcon: function(el) {
      $('<span>').addClass('glyphicon glyphicon-volume-up').insertAfter(el)
        .before('&nbsp;');
    },

    stop: function() {
      this.$player.jPlayer('stop');
      this.reset();
    },
    
    reset: function(el) {
      this.$el.find('.playing').removeClass('playing');
      this.$el.find('.glyphicon.glyphicon-volume-up').remove();
      this.$player_container.fadeOut(500);
    }

  });
});
