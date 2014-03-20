/**
 * Videos collection
 * 
 */
define([
  'backbone',
  'models/cms/file/video'
], function(Backbone, VideoModel) {
  return Backbone.Collection.extend({
    url: '/cms/videos/',
    model: VideoModel,
    initialize: function(opts) {
    }
  });
});
