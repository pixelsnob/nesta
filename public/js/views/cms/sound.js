/**
 * Sound view
 * 
 */
define([
  'backbone',
  'models/cms/sound',
  'jade'
], function(Backbone, SoundModel, jade) {
  return Backbone.View.extend({
    
    model: SoundModel,
    
    tagName: 'tr',
    
    events: {
    },
    
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      var tpl = $(jade.render('cms/sound', { sound: this.model.toJSON() }));
      this.$el.html(tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});
