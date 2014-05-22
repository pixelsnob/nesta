/**
 * List of sound files
 * 
 */
define([
  './base',
  '../../collections/files/sounds',
  '../file/sound',
  '../upload/sound'
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

