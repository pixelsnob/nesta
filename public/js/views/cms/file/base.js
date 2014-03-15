/**
 * Image view
 * 
 */
define([
  'views/base',
  'jade'
], function(BaseView, ImageModel, jade) {
  return BaseView.extend({
    
    model: null,
    
    tagName: 'tr',
    
    events: {
    },
    
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    }
  });
});
