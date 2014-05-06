/**
 * Override of modal view for backbone forms. Save event attempts to commit()
 * the form
 * 
 */
define([
  'views/cms/modal',
  'jade'
], function(ModalView, jade) {
  return ModalView.extend({
    
    initialize: function(opts) {
      this.form = opts.form;
      ModalView.prototype.initialize.apply(this);
    },

    save: function() {
      var errors = this.form.commit();
      if (!errors) {
        this.$el.modal('hide');
        this.trigger('save');
      }
      return false;
    }

  });
});
