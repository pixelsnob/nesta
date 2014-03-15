/**
 * Sound view
 * 
 */
define([
  'views/cms/file/base',
  'models/cms/sound',
  'jade'
], function(FileView, SoundModel, jade) {
  return FileView.extend({
    
    model: SoundModel,

    render: function() {
      var tpl = $(jade.render('cms/sound', { sound: this.model.toJSON() }));
      this.$el.html(tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});
