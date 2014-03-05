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
        obj.trigger('open');
        // Adjust z-index of modal backdrops so that multiple modals stack
        // correctly
        var m = $('.modal-backdrop');
        m.each(function(i) {
          if (typeof m[i - 1] != 'undefined') {
            $(m[i]).css('z-index', parseInt($(m[i - 1]).css('z-index')) + 10);
          }
        });
      });
      this.$el.on('hidden.bs.modal', function(ev) {
        obj.trigger('close');
      });
    },
    modal: function(opts) {
      this.$el.find('.modal-body').html(opts.body);
      if (opts.save_label) {
        this.$el.find('button.save').text(opts.save_label);
      }
      this.$el.modal({ backdrop: 'static', keyboard: false });
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
