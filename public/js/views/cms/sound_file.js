/**
 * Sound file
 * 
 */
define([
  'backbone',
  'models/cms/sound_file',
  'jade'
], function(Backbone, SoundFileModel, jade) {
  return Backbone.View.extend({
    model: new SoundFileModel,
    tagName: 'tr',
    events: {
    },
    
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      var tpl = $(jade.render('cms/sound_file', {
        sound_file: this.model.toJSON()
      }));
      this.$el.html(tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});
