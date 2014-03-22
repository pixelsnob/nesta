/**
 * 
 * 
 */
define([
  'backbone',
  'collections/cms/files/images',
  'collections/cms/files/sounds',
  'collections/cms/files/videos'
], function(Backbone, ImagesCollection, SoundsCollection, VideosCollection) {
  return {
    'images': new ImagesCollection,
    'sounds': new SoundsCollection,
    'videos': new VideosCollection
  };
});
