/**
 * List of sound files
 * 
 */
define([
  'views/cms/files',
  'collections/cms/sounds',
  'views/cms/sound',
  'views/cms/sound_upload'
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

