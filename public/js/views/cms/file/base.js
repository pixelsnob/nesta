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
    
    model: null,
    
    tagName: 'tr',
    
    events: {
    },
    
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    }
  });
});
