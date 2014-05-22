/**
 * 
 * 
 */
define([
  'backbone',
  './files/images',
  './files/sounds'
], function(Backbone, ImagesCollection, SoundsCollection) {
  return {
    'images': new ImagesCollection,
    'sounds': new SoundsCollection
  };
});
