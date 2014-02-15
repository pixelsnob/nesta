/**
 * Content blocks collection
 * 
 */
define([
  'backbone',
  'models/cms/content_block'
], function(Backbone, ContentBlockModel) {
  return Backbone.Collection.extend({
    model: ContentBlockModel,
    initialize: function(opts) {
      //console.log(this.models);
    }
  });
});
