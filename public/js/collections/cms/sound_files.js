/**
 * Sounds collection
 * 
 */
define([
  'backbone',
  'models/cms/sound_file'
], function(Backbone, SoundFileModel) {
  return Backbone.Collection.extend({
    url: '/cms/sounds/',
    model: SoundFileModel,
    initialize: function(opts) {
    }
  });
});
