/**
 * List of image files
 * 
 */
define([
  'backbone',
  'views/cms/files',
  'collections/cms/images',
  'views/cms/image',
  'views/cms/image_upload',
  'jade'
], function(
  Backbone,
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



