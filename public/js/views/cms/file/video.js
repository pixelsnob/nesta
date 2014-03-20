/**
 * Video view
 * 
 */
define([
  'views/cms/file/base',
  'models/cms/file/video',
  'jade'
], function(FileView, VideoModel, jade) {
  return FileView.extend({
    
    model: VideoModel,

    render: function() {
      var tpl = $(jade.render('cms/video', { video: this.model.toJSON() }));
      this.$el.html(tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});
