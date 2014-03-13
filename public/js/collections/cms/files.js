/**
 * Images collection
 * 
 */
define([
  'backbone',
  'models/cms/file'
], function(Backbone, ImageModel) {
  return Backbone.Collection.extend({
    url: '/cms/files/',
    model: ImageModel,
    initialize: function(opts) {
    }
  });
});
