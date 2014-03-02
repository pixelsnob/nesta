/**
 * Content blocks collection
 * 
 */
define([
  'backbone',
  'models/cms/image'
], function(Backbone, ImageModel) {
  return Backbone.Collection.extend({
    url: '/images/',
    model: ImageModel,
    initialize: function(opts) {
    }
  });
});
