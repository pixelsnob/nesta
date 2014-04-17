/**
 * Video and audio playlist view
 * 
 */
define([
  'views/base',
  'models/playlist_item',
  'views/player/manager'
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
      this.listenTo(this.player_manager_view, 'stopped', this.reset);
      var obj   = this;
      _.each(PlaylistItemModel.meta, function(meta) {
        obj.events['click ' + meta.sel] = 'play';
      });
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
      //this.addPlayIcon(el, model);
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
    
    /*addPlayIcon: function(el, model) {
      var meta = model.getMeta();
      var glyph = (meta.media_type == 'audio' ? 'glyphicon-volume-up' :
                   'glyphicon-facetime-video');
      $('<span>').addClass('glyphicon ' + glyph).insertAfter(el)
        .before('&nbsp;');
    },*/

    stop: function() {
      this.reset();
    },
    
    reset: function(el) {
      this.$el.find('.playing').removeClass('playing');
      this.$el.find('.glyphicon').remove();
    }

  });
});
