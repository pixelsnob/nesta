/**
 * Options form view
 * 
 */
define([
  './base',
  './modal/form',
  '../forms/page_options'
], function(
  BaseView,
  ModalFormView,
  OptionsForm
) {
  return BaseView.extend({
    initialize: function() {
      this.form = new OptionsForm({
        model: this.model,
        fields: [ 'title', 'keywords', 'description' ]
      });
    },
    
    render: function() {
      return this.form.render();
    },
    
    renderModal: function() {
      var modal_view = new ModalFormView({ form: this.form });
      this.listenTo(modal_view, 'open', this.focus);
      this.listenTo(modal_view, 'save', this.save);
      modal_view.listenTo(this, 'save', modal_view.hide);
      modal_view.modal({
        title: 'Edit Page Options',
        body: this.render().el,
        save_label: 'Save'
      });
    },
    
    save: function() {
      var errors = this.form.commit();
      if (!errors) {
        this.model.save(this.model.attributes, {
          wait: true,
          success: _.bind(this.trigger, this, 'save'),
          error:   _.bind(this.showServerError, this)
        });
      } else {
        this.showServerError();
      }
    },

    focus: function() {
      this.form.$el.find('textarea').get(0).focus();
    }

  });
});
