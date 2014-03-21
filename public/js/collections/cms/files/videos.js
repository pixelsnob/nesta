/**
 * Videos collection
 * 
 */
define([
  'collections/cms/files/base',
  'models/cms/file/video'
], function(FilesCollection, VideoModel) {
  return FilesCollection.extend({
    url: '/cms/videos/',
    model: VideoModel,
    initialize: function(opts) {
    }
  });
});
