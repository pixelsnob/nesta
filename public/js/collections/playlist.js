/**
 * Video and audio playlist collection
 * 
 */
define([
  'models/base',
  'models/playlist_item'
], function(BaseModel, PlaylistItemModel) {
  return Backbone.Collection.extend({
    model: PlaylistItemModel,
    initialize: function() {
    }
  });
});
