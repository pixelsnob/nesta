/**
 * Image view
 * 
 */
define([
  'views/base'
], function(BaseView) {
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
