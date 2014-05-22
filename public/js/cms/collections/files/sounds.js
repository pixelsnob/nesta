/**
 * Sounds collection
 * 
 */
define([
  './base',
  '../../models/file/sound'
], function(FilesCollection, SoundFileModel) {
  return FilesCollection.extend({
    url: '/cms/sounds/',
    model: SoundFileModel,
    initialize: function(opts) {
    }
  });
});
