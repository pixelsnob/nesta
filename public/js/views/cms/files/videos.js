/**
 * List of video files
 * 
 */
define([
  'views/cms/files/base',
  'collections/cms/videos',
  'views/cms/file/video',
  'views/cms/upload/video',
  'jade'
], function(
  FilesView,
  VideosCollection,
  VideoView,
  VideoUploadView,
  jade
) {
  return FilesView.extend({
    
    collection:  VideosCollection,
    upload_view: VideoUploadView,
    row_view:    VideoView,

    initialize: function() {
      FilesView.prototype.initialize.apply(this);
    }
  });
});



