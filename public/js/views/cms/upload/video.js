/**
 * video upload view
 * 
 */
define([
  'views/cms/upload/base',
  'models/cms/file/video',
  'jade'
], function(UploadView, VideoModel, jade) {
  return UploadView.extend({
    
    model: new VideoModel,

    initialize: function() {
      this.setElement($(jade.render('cms/video_upload')));
      UploadView.prototype.initialize.apply(this);
    }
    
  });
});
