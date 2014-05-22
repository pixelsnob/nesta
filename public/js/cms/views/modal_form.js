/**
 * Override of modal view for backbone forms. Save event attempts to commit()
 * the form
 * 
 */
define([
  './modal',
  'jade'
], function(ModalView, jade) {
  return ModalView.extend({
    
    initialize: function(opts) {
      this.form = opts.form;
      ModalView.prototype.initialize.apply(this);
    },

    save: function() {
      var errors = this.form.commit(), obj = this;
      if (!errors) {
        this.model.save(this.model.attributes, {
          wait: true,
          success: function() {
            obj.$el.modal('hide');
            obj.trigger('save');
          },
          error: _.bind(this.showServerError, this)
        });
      }
      return false;
    }

  });
});
