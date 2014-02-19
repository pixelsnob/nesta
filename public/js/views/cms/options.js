/**
 * Options form view
 * 
 */
define([
  'backbone',
  'forms/cms/options',
  'views/modal/form',
  'jade',
  'bootstrap'
], function(Backbone, OptionsForm, ModalFormView, jade) {
  return ModalFormView.extend({
    initialize: function() {
      ModalFormView.prototype.initialize.apply(this);
    },
    render: function() {
      this.form = new OptionsForm({
        model: this.model,
        fields: [ 'title', 'keywords', 'description' ]
      });
      return this.form.render().el;
    },
    modal: function() {
      ModalFormView.prototype.modal.apply(this);
      this.$el.find('.modal-title').text('Page options');
      this.$el.find('.modal-body').html(this.render());
    }
  });
});
