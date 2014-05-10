/**
 * 
 * 
 */
define([
  'backbone',
  'collections/cms/files/images',
  'collections/cms/files/sounds'
], function(Backbone, ImagesCollection, SoundsCollection) {
  return {
    'images': new ImagesCollection,
    'sounds': new SoundsCollection
  };
});
