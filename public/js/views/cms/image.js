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
      'click':           'select',
      'click .remove a': 'remove'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', function(model) {
        this.$el.remove();
      });
    },
    
    select: function() {
      this.$el.closest('table').find('tr.selected').removeClass('selected');
      this.$el.addClass('selected');
    },

    render: function() {
      this.setElement($(jade.render('cms_image', {
        image: this.model.toJSON()
      })));
      return this.$el;
    },
    
    remove: function(ev) {
      var msg = 'Are you sure? Existing links to this image will be broken!';
      if (confirm(msg)) {
        this.model.destroy({ wait: true });
      }
      return false;
    }
  });
});
