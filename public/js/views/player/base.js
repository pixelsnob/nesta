/**
 * Base player view
 * 
 */
define([
  'views/base',
  'jade'
], function(BaseView) {
  return BaseView.extend({
    //el: 'body',
    el: 'body',
    events: {
      'click a.close': 'close'
    },
    initialize: function(opts) {
    },
    
    ended: function() {
      //this.hide();
      this.trigger('ended');
    },
    
    close: function() {
      /*this.stop();
      //this.hide();
      this.$el.find('#overlay').hide();
      this.trigger('ended');*/
      this.trigger('close');
    },
    
    ready: function(ev) {
    },
    
    show: function() {
      this.$player_container.height('auto').css('opacity', 1);
      //this.$el.find('#overlay').show();
    },
    
    hide: function() {
      this.$player_container.height(0).css('opacity', 0);
      //this.$el.find('#overlay').hide();
      //console.log('hide?');
    },
    
    error: function(ev) {
    }
    
  });
});
