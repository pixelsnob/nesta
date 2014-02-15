/**
 * Content block form
 * 
 */
define([
  'backbone',
  'forms/cms/content_block',
  'views/modal/form',
  'jade',
  'bootstrap'
], function(Backbone, ContentBlockForm, ModalFormView, jade) {
  return ModalFormView.extend({
    initialize: function() {
      ModalFormView.prototype.initialize.apply(this);
    },
    render: function() {
      this.form = new ContentBlockForm({
        model: this.model,
        fields: [ 'content' ]
      });
      return this.form.render().el;
    },
    modal: function() {
      ModalFormView.prototype.modal.apply(this);
      this.$el.find('.modal-title').text('Edit Content Block');
      this.$el.find('.modal-body').html(this.render());
    }
  });
});
