/**
 * Markdown-based slideshow
 * 
 */
define([
  'views/base'
], function(
  BaseView
) {
  return BaseView.extend({
    el: 'body',
    events: {},
    interval_id: null,
    current_index: 0,

    initialize: function(opts) {
      this.$list = this.$el.find('#slideshow ul');
      var obj = this;
      this.interval_id = setInterval(function() {
        obj.next(); 
      }, 5000);
    },

    next: function() {
      var list_elements = this.$list.find('li'),
          current       = list_elements.eq(this.current_index),
          next          = list_elements.eq(this.current_index + 1);
      if (next.length) {
        this.current_index++;
      } else {
        this.current_index = 0;
      }
      current.fadeOut(1000);
      list_elements.eq(this.current_index).fadeIn(1000);
    }
  });
});

