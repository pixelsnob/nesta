/**
 * List of image files
 * 
 */
define([
  './base',
  '../../collections/files/images',
  '../file/image',
  '../upload/image',
  'jade'
], function(
  FilesView,
  ImagesCollection,
  ImageView,
  ImageUploadView,
  jade
) {
  return FilesView.extend({
    
    collection:  ImagesCollection,
    upload_view: ImageUploadView,
    row_view:    ImageView,

    initialize: function() {
      FilesView.prototype.initialize.apply(this);
    }
  });
});



