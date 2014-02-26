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
      // Add CMS functionality if user is logged in
      if (window.nesta && window.nesta.user) {
        require([ 'views/cms/page' ], _.bind(function(PageView) {
          this.page_view = new PageView({ el: this.$el });
        }, this));
      }
    }
  });
});
