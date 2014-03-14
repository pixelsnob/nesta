/**
 * Sound view
 * 
 */
define([
  'views/base',
  'models/cms/sound',
  'jade'
], function(BaseView, SoundModel, jade) {
  return BaseView.extend({
    
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
