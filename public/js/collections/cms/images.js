/**
 * Content blocks collection
 * 
 */
define([
  'backbone',
  'models/cms/image'
], function(Backbone, ImageModel) {
  return Backbone.Collection.extend({
    url: '/cms/images/',
    model: ImageModel,
    initialize: function(opts) {
    }
  });
});
