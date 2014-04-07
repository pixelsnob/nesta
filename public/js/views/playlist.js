/**
 * Video and audio playlist view
 * 
 */
define([
  'views/base',
  'collections/playlist',
  'models/playlist',
  'views/player'
], function(
  BaseView,
  PlaylistCollection,
  PlaylistModel,
  PlayerView
) {
  return BaseView.extend({
    el: 'body',
    events: {},

    initialize: function(opts) {
      this.collection = new PlaylistCollection;
      this.model = new PlaylistModel;
      this.player_view = new PlayerView;
      this.listenTo(this.player_view, 'ended', this.reset);
      var obj = this;
      // Go through meta object, add to collection, and add an event for
      // each link
      _.each(this.model.meta, function(meta) {
        var links = obj.$el.find(meta.sel);
        _.each(links, function(a) {
          obj.collection.add({
            src:        $(a).attr('href'),
            meta:       meta
          });
        });
        obj.events['click ' + meta.sel] = 'play';
      });
    },
    
    play: function(ev) {
      ev.preventDefault();
      var el = $(ev.currentTarget);
      if (el.hasClass('playing')) {
        return false;
      }
      var model = this.collection.findWhere({
        src: el.attr('href')
      })
      if (typeof model == 'undefined') {
        return false;
      }
      this.player_view.play(model);
      this.reset();
      this.addPlayIcon(el);
      this.$el.find('.current').removeClass('current');
      el.addClass('playing').addClass('current');
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
    },
    
    reset: function(el) {
      this.$el.find('.playing').removeClass('playing');
      this.$el.find('.glyphicon.glyphicon-volume-up').remove();
    }

  });
});
