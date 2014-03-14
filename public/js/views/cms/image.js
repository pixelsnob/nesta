/**
 * Image view
 * 
 */
define([
  'views/base',
  'models/cms/image',
  'jade'
], function(BaseView, ImageModel, jade) {
  return BaseView.extend({
    
    model: ImageModel,
    
    tagName: 'tr',
    
    events: {
    },
    
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      var tpl = $(jade.render('cms/image', { image: this.model.toJSON() }));
      this.$el.html(tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});
