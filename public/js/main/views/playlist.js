/**
 * Video and audio playlist view
 * 
 */
define([
  './base',
  '../models/playlist_item',
  './player/manager'
], function(
  BaseView,
  PlaylistItemModel,
  PlayerManagerView
) {
  return BaseView.extend({
    el: 'body',
    events: {},

    initialize: function(opts) {
      this.player_manager_view = new PlayerManagerView;
      var obj = this;
      // Wait till player is ready before assigning click handlers to media links
      this.listenTo(this.player_manager_view, 'ready', function() {
        _.each(PlaylistItemModel.meta, function(meta) {
          obj.events['click ' + meta.sel] = 'play';
          obj.delegateEvents();
        });
      });
      this.listenTo(this.player_manager_view, 'ended', this.ended);
      this.listenTo(this.player_manager_view, 'playing', this.playing);
      this.listenTo(this.player_manager_view, 'stopped', this.stopped);
    },
    
    play: function(ev) {
      ev.preventDefault();
      var el = $(ev.currentTarget);
      if (el.hasClass('playing')) {
        return false;
      }
      var model = new PlaylistItemModel({
        src: el.attr('href')
      });
      this.player_manager_view.play(model);
      this.reset();
      el.addClass('playing');
      return false;
    },
    
    playing: function() {
    },

    stopped: function() {
      this.reset();
    },
    
    ended: function() {
      this.reset();
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
      var next = this.$el.find('a.playing').parent().next().find('a');
      if (next.length) {
        next.trigger('click');
      } else {
        this.reset();
      }
    },
    
    addPlayIcon: function(el, model) {
      var meta = model.getMeta();
      var glyph = (meta.media_type == 'audio' ? 'glyphicon-volume-up' :
                   'glyphicon-facetime-video');
      $('<span>').addClass('glyphicon ' + glyph).insertAfter(el)
        .before('&nbsp;');
    },

    stop: function() {
      //console.log('stop');
      this.reset();
    },
    
    reset: function(el) {
      this.$el.find('.playing').removeClass('playing');
      this.$el.find('.glyphicon').remove();
    }

  });
});
