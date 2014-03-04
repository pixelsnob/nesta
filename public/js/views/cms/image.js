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
      this.setElement($(jade.render('cms_image', {
        image: this.model.toJSON()
      })));
      this.listenTo(this.model, 'destroy', function(model) {
        this.$el.remove();
      });
    },
    render: function() {
      return this.$el;
    },
    remove: function(ev) {
      //var id = $(ev.currentTarget).closest('tr').attr('id');
      //console.log(id); 
      this.model.destroy();
      //this.collection.remove({ id:  });
    }
  });
});
