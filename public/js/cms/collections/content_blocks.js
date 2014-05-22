/**
 * Content blocks collection
 * 
 */
define([
  '../models/content_block'
], function(ContentBlockModel) {
  return Backbone.Collection.extend({
    model: ContentBlockModel,
    initialize: function() {
    }
  });
});
