/**
 * Image view
 * 
 */
define([
  './base',
  '../../models/file/image',
  'template'
], function(FileView, ImageModel, template) {
  return FileView.extend({
    
    model: ImageModel,

    render: function() {
      var $tpl = $(template.render('cms/image', { image: this.model.toJSON() }));
      this.$el.html($tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});
