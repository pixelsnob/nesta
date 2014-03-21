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
    comparator: function(model) {
      return model.get('path');
    },
    initialize: function(opts) {
    }
  });
});
