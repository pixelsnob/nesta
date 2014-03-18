/**
 * App-level view
 * 
 */
define([
  'views/base',
  'views/jplayer'
], function(BaseView, JplayerView) {
  return BaseView.extend({
    el: 'body',
    events: {
    },
    initialize: function() {
      this.player_view = new JplayerView;
    }
  });
});
