/**
 * Sound view
 * 
 */
define([
  './base',
  '../../models/file/sound',
  'template'
], function(FileView, SoundModel, template) {
  return FileView.extend({
    
    model: SoundModel,

    render: function() {
      var $tpl = $(template.render('cms/sound', { sound: this.model.toJSON() }));
      this.$el.html($tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});
