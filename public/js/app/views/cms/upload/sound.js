/**
 * Sound upload view
 * 
 */
define([
  'views/cms/upload/base',
  'models/cms/file/sound',
  'jade'
], function(UploadView, SoundModel, jade) {
  return UploadView.extend({
    
    model: new SoundModel,

    initialize: function() {
      this.setElement($(jade.render('cms/sound_upload')));
      UploadView.prototype.initialize.apply(this);
    },

    render: function() {
      return this.$el;
    }
    
  });
});


