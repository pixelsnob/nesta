/**
 * Options form view
 * 
 */
define([
  'views/base',
  'forms/cms/page_options',
  'views/cms/modal_form'
], function(BaseView, OptionsForm, ModalFormView) {
  return BaseView.extend({
    initialize: function() {
      this.form = new OptionsForm({
        model: this.model,
        fields: [ 'title', 'keywords', 'description' ]
      });
    },
    
    render: function() {
      return this.form.render().el;
    },
    
    modal: function() {
      var view = new ModalFormView({ form: this.form });
      //this.listenTo(view, 'save', this.save);
      view.modal({ body: this.render() });
    },

    save: function() {
      this.model.save();
    }

  });
});
