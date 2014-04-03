/**
 * Video and audio playlist view
 * 
 */
define([
  'views/base',
  'collections/playlist'
], function(BaseView, PlaylistCollection) {
  return BaseView.extend({
    el: 'body',
    extensions: [ 'm4v', 'mp4', 'webm', 'mp3' ],
    events: {
      'click .play':  'play'
    },

    initialize: function(opts) {
      this.player_view = opts.player_view;
      // Find all media links on page and add to a collection
      this.collection = new PlaylistCollection;
      var obj = this;
      _.each(this.extensions, function(extension) {
        var el = obj.$el.find('a[href$=".' + extension + '"]');
        _.each(el, function(a) {
          obj.collection.add({
            src: $(a).attr('href')
          });
          $(a).addClass('play').css('color', 'red');
        });
      });
      this.listenTo(this, 'play', _.bind(this.player_view.play,
        this.player_view));
      this.listenTo(this, 'stop', _.bind(this.player_view.stop,
        this.player_view));
      this.listenTo(this.player_view, 'ended', this.next);
      this.listenTo(this.player_view, 'error', this.reset);
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
      this.$el.find('.current').removeClass('current');
      el.addClass('playing').addClass('current');
      var model = this.collection.findWhere({ src: el.attr('href') });
      this.trigger('play', model);
      return false;
    },
    
    previous: function() {
      var previous = this.$el.find('a.playing').parent().prev()
        .find('.play');
      if (previous.length) {
        this.playHref(previous);
      } else {
        this.reset();
      }
    },

    next: function() {
      var next = this.$el.find('a.playing').parent().next()
        .find('.play');
      if (next.length) {
        this.playHref(next);
      } else {
        this.reset();
      }
    },
    
    addPlayIcon: function(el) {
      $('<span>').addClass('glyphicon glyphicon-volume-up').insertAfter(el)
        .before('&nbsp;');
    },

    stop: function() {
      this.reset();
      this.trigger('stop');
    },
    
    reset: function(el) {
      this.$el.find('.playing').removeClass('playing');
      this.$el.find('.glyphicon.glyphicon-volume-up').remove();
    }

  });
});
