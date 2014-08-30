/**
 * Image view
 * 
 */
define([
  './base',
  'template'
], function(FileView, template) {
  return FileView.extend({
    
    render: function() {
      var $tpl = $(template.render('cms/image', { image: this.model.toJSON() }));
      this.$el.html($tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});

