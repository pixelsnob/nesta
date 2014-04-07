/**
 * Audio/video player view
 * 
 */
define([
  'views/base',
  'jplayer',
  'jade'
], function(BaseView, jplayer, jade) {
  return BaseView.extend({
    el: 'body',
    /*events: {
      'click .jp-stop': 'ended'
    },*/

    initialize: function(opts) {
      this.$el.find('#player-container').append($(jade.render('player/jplayer')));
      this.$player = this.$el.find('#player');
      this.$player.jPlayer({
        supplied:            'mp3,m4v',
        swfPath:             '/bower_components/jplayer/jquery.jplayer/' + 
                             'Jplayer.swf',
        cssSelectorAncestor: '#player-ui',
        errorAlerts:         true,
        //ready:               _.bind(this.ready, this),
        ended:               _.bind(this.ended, this),
        wmode:               'window',
        error:               _.bind(this.error, this)
      });
    },
    
    render: function() {
      return this.$el;
    },
    
    play: function(model) {
      var opts = {};
      opts[model.get('jplayer_type')] = model.get('src');
      this.$player.jPlayer('setMedia', opts);
      this.$player.jPlayer('play');
    },

    stop: function() {
      this.$player.jPlayer('stop');
    },
    
    ended: function() {
      this.trigger('ended');
    },

    error: function() {
      this.trigger('error');
    }
  });
});
