/**
 * Options form view
 * 
 */
define([
  './base',
  '../forms/page_options',
  './modal/form'
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
    
    focus: function() {
      this.form.$el.find('textarea').get(0).focus();
    }

  });
});
