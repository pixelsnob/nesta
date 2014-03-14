/**
 * List of sound files
 * 
 */
define([
  'backbone',
  'views/cms/files',
  'collections/cms/sounds',
  'views/cms/sound',
  'views/cms/sound_upload',
  'jade'
], function(
  Backbone,
  FilesView,
  SoundsCollection,
  SoundView,
  SoundUploadView,
  jade
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

