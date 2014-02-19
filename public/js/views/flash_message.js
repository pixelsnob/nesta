/**
 * Flash message view
 * 
 */
define([
  'backbone',
  'modules/vent'
], function(Backbone, vent) {
  return Backbone.View.extend({
    events: {},
    initialize: function() {
      this.setElement(this.el);
      this.listenTo(vent, 'message', function(msg) {
        this.render(msg);
      });
      this.listenTo(vent, 'message:error', function(msg) {
        // custom style?
        this.render(msg);
      });
    },
    render: function(msg) {
      this.$el.html(msg).show();
      setTimeout(_.bind(function() {
        this.$el.fadeOut();
      }, this), 3000);
    }
  });
});
