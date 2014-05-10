/**
 * Images collection
 * 
 */
define([
  'collections/cms/files/base',
  'models/cms/file/image'
], function(FilesCollection, ImageModel) {
  return FilesCollection.extend({
    url: '/cms/images/',
    model: ImageModel,
    initialize: function(opts) {
    }
  });
});
