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
      var view = new ModalFormView({ model: this.model, form: this.form });
      this.listenTo(view, 'open', function() {
        view.$el.find('textarea').get(0).focus();
      });
      view.modal({ body: this.render() });
    }

  });
});
