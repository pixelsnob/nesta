/**
 * Options form view
 * 
 */
define([
  'backbone',
  'views/modal',
  'jade',
  'bootstrap'
], function(Backbone, ModalView, jade) {
  return ModalView.extend({
    initialize: function() {
      ModalView.prototype.initialize.apply(this);
    },
    render: function() {
    },
    modal: function() {
      ModalView.prototype.modal.apply(this);
      this.$el.find('.modal-title').text('Page options');
      this.$el.find('.modal-body').html(this.render());
    }
  });
});
