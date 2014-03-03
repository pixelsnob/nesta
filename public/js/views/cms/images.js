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
      
    },
    render: function() {
      return 'x';
    },
    modal: function() {
      var modal_view = new ModalView({ el: this.el });
      this.listenTo(modal_view, 'open', function() {
      });
      this.listenTo(modal_view, 'save', function() {
      });
      modal_view.modal({
        body: this.render()
      });
    }
  });
});
