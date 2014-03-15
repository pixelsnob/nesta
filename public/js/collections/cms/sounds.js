/**
 * Sounds collection
 * 
 */
define([
  'backbone',
  'models/cms/file/sound'
], function(Backbone, SoundFileModel) {
  return Backbone.Collection.extend({
    url: '/cms/sounds/',
    model: SoundFileModel,
    initialize: function(opts) {
    }
  });
});
