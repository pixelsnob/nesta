/**
 * Image view
 * 
 */
define([
  'backbone',
  'models/cms/image',
  'jade'
], function(Backbone, ImageModel, jade) {
  return Backbone.View.extend({
    model: new ImageModel,
    events: {
      'click .remove a': 'remove'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', function(model) {
        this.$el.remove();
      });
    },
    
    render: function() {
      this.setElement($(jade.render('cms_image', {
        image: this.model.toJSON()
      })));
      return this.$el;
    },
    
    remove: function(ev) {
      this.model.destroy({ wait: true });
      return false;
    }
  });
});
