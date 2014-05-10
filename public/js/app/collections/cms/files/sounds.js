/**
 * Sounds collection
 * 
 */
define([
  'collections/cms/files/base',
  'models/cms/file/sound'
], function(FilesCollection, SoundFileModel) {
  return FilesCollection.extend({
    url: '/cms/sounds/',
    model: SoundFileModel,
    initialize: function(opts) {
    }
  });
});
