/**
 * List of image files
 * 
 */
define([
  'views/cms/files',
  'collections/cms/images',
  'views/cms/image',
  'views/cms/image_upload',
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



