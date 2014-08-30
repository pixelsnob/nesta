/**
 * Sound view
 * 
 */
define([
  './base',
  'template'
], function(FileView, template) {
  return FileView.extend({
    
    render: function() {
      var $tpl = $(template.render('cms/sound', { sound: this.model.toJSON() }));
      this.$el.html($tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});
