/**
 * Jplayer player implementation
 * 
 */
define([
  '../base',
  'jplayer',
  'jade',
  'jquery-ui/ui/slider'
], function(BaseView, jplayer, jade) {
  return BaseView.extend({
    el: '#players',
    events: {
      'click #jplayer .jp-stop': 'stop',
    },

    initialize: function(opts) {
      this.$el.append($(jade.render('player/jplayer')));
      var container = this.$player_container = this.$el.find('#jplayer');
      this.$player = this.$el.find('#jplayer .player');
      var obj = this;
      this.$player.jPlayer({
        supplied:            'mp3',
        swfPath:             '/bower_components/jplayer/jquery.jplayer/' + 
                             'Jplayer.swf',
        cssSelectorAncestor: '.player-ui',
        errorAlerts:         true,
        ended:               _.bind(this.ended, this),
        wmode:               'window',
        error:               _.bind(this.error, this),
        ready:               _.bind(this.ready, this),
        timeupdate:          _.bind(this.timeupdate, this)
      });
      container.find('.custom-volume-bar').slider({
        min: 0,
        max: 100,
        value: 75,
        range: 'min',
        animate: false,
        slide: function(ev, ui) {
          var volume = ui.value / 100;
          obj.$player.jPlayer('volume', volume);
        }
      });
      container.find('.custom-seek-bar').slider({
        min: 0,
        max: 100,
        value: 0,
        range: 'min',
        animate: false,
        slide: function(ev, ui) {
          var sp = obj.$player.data().jPlayer.status.seekPercent;
          obj.$player.jPlayer('playHead', ui.value * (100 / sp));
        }
      });
    },
    
    timeupdate: function(ev) {
      var percent = ev.jPlayer.status.currentPercentAbsolute;
      this.$player_container.find('.custom-seek-bar').slider('value', percent);
    },

    ready: function() {
      this.trigger('ready');
    },

    render: function() {
      return this.$el;
    },
    
    play: function(model, title) {
      var obj = this;
      this.$player_container.find('.jp-title').text('');
      this.show(function() {
        var opts = {},
            meta = model.getMeta();
        opts[meta.jplayer_type] = model.get('src');
        opts.title = title;
        obj.$player.jPlayer('setMedia', opts);
        obj.$player.jPlayer('play');
        obj.trigger('play');
      });
    },

    stop: function() {
      if (this.$player.data().jPlayer.status.src) {
        this.$player.jPlayer('stop');
        this.trigger('stopped');
        this.$player.jPlayer('clearMedia');
        this.hide();
      }
    },
    
    show: function(cb) {
      cb = (typeof cb == 'function' ? cb : function() {});
      var h = this.$player_container.height();
      if (h) {
        // Skip the rest if already open
        return cb();
      }
      // Set height to auto temporarily to see how tall it will be when open
      this.$player_container.height('auto');
      h = this.$player_container.height();
      this.$player_container.height(0);
      this.$player_container.animate({ height: h }, 500, 'linear', cb);
    },

    hide: function() {
      this.$player_container.animate({ height: 0 }, 300);
    },

    ended: function() {
      this.trigger('ended');
      this.hide();
    },

    error: function() {
      this.trigger('error');
    }
  });
});
