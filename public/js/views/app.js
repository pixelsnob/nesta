/**
 * App-level view
 * 
 */
define([
  'backbone'
], function(Backbone) {
  return Backbone.View.extend({
    el: 'body',
    events: {
      
    },
    initialize: function() {
      var obj = this;
      // Add CMS functionality if user is logged in
      if (window.nesta.user) {
        require([ 'views/cms/page' ], function(PageView) {
          obj.page_view = new PageView({ el: obj.$el });
        });
      }
    }
  });
});
