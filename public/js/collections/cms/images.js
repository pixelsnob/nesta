/**
 * Images collection
 * 
 */
define([
  'backbone',
  'models/cms/file/image'
], function(Backbone, ImageModel) {
  return Backbone.Collection.extend({
    url: '/cms/images/',
    model: ImageModel,
    initialize: function(opts) {
    }
  });
});
