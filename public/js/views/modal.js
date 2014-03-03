/**
 * Bootstrap modal view
 * 
 */
define([
  'backbone',
  'jade',
  'bootstrap'
], function(Backbone, jade) {
  return Backbone.View.extend({
    events: {
      'click .save':    'save',
      'click .cancel':  'cancel'
    },
    initialize: function() {
      this.setElement($(jade.render('modal')));
      var obj = this;
      this.$el.on('shown.bs.modal', function(ev) {
        $(window).on('keyup', function(ev) {
          if (ev.keyCode == 27) {
            obj.cancel();
          }
        });
        obj.trigger('open');
      });
      this.$el.on('hidden.bs.modal', function(ev) {
        $(window).off('keyup');
      });
    },
    modal: function(title, body) {
      this.$el.find('.modal-title').text(title);
      this.$el.find('.modal-body').html(body);
      this.$el.modal({ backdrop: 'static', keyboard: true });
    },
    save: function() {
      this.$el.modal('hide');
      this.trigger('save');
      return false;
    },
    cancel: function(ev) {
      this.$el.modal('hide');
      this.trigger('cancel');
      return false;
    }
  });
});
