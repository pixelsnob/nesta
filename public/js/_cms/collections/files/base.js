/**
 * Base files collection
 * 
 */
define([
  'backbone'
], function(Backbone) {
  return Backbone.Collection.extend({
    comparator: function(model) {
      return model.get('path');
    },
    initialize: function(opts) {
    }
  });
});
