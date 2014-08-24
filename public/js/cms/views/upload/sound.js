/**
 * Sound upload view
 * 
 */
define([
  './base',
  '../../models/file/sound',
  'template'
], function(UploadView, SoundModel, template) {
  return UploadView.extend({
    
    model: new SoundModel,

    initialize: function() {
      this.setElement(template.render('cms/sound_upload'));
      UploadView.prototype.initialize.apply(this);
    },

    render: function() {
      return this.$el;
    }
    
  });
});


