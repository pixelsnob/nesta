/**
 * Content blocks collection
 * 
 */
define([
  'models/base',
  'models/cms/content_block'
], function(BaseModel, ContentBlockModel) {
  return Backbone.Collection.extend({
    model: ContentBlockModel,
    initialize: function() {
    }
  });
});
