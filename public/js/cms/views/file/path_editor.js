/**
 * View for editing file "path" field
 * 
 */
define([
  '../base',
  '../../forms/file',
  '../mixins/single_field_form',
  'template'
], function(FileView, FileForm, FormMixin, template) {
  
  var view = FileView.extend({
    
    initialize: function() {
      this.form = new FileForm({ model: this.model, fields: [ 'path' ] });
      this.setElement(this.form.render().el);
    },
    
    render: function() {
      return this.$el;
    }
  });

  return view.mixin(FormMixin);

});

