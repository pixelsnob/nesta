/**
 * List of image files
 * 
 */
define([
  'views/cms/files/base',
  'collections/cms/images',
  'views/cms/file/image',
  'views/cms/upload/image',
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



