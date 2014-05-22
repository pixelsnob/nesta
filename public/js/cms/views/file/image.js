/**
 * Image view
 * 
 */
define([
  './base',
  '../../models/file/image',
  'jade'
], function(FileView, ImageModel, jade) {
  return FileView.extend({
    
    model: ImageModel,

    render: function() {
      var tpl = $(jade.render('cms/image', { image: this.model.toJSON() }));
      this.$el.html(tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});
