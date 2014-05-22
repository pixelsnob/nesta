/**
 * Images collection
 * 
 */
define([
  './base',
  '../../models/file/image'
], function(FilesCollection, ImageModel) {
  return FilesCollection.extend({
    url: '/cms/images/',
    model: ImageModel,
    initialize: function(opts) {
    }
  });
});
