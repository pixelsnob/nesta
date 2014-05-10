/**
 * List of sound files
 * 
 */
define([
  'views/cms/files/base',
  'collections/cms/files/sounds',
  'views/cms/file/sound',
  'views/cms/upload/sound'
], function(
  FilesView,
  SoundsCollection,
  SoundView,
  SoundUploadView
) {
  return FilesView.extend({
    
    collection:  SoundsCollection,
    upload_view: SoundUploadView,
    row_view:    SoundView,

    initialize: function() {
      FilesView.prototype.initialize.apply(this);
    }
  });
});

