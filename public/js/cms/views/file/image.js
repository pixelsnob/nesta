/**
 * Image view
 * 
 */
define([
  './base',
  'lib/format',
  'template'
], function(FileView, format, template) {
  return FileView.extend({
    
    render: function() {
      var opts = _.extend(format, { image: this.model.toJSON() });
      var $tpl = $(template.render('cms/image', opts));
      this.$el.html($tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});

