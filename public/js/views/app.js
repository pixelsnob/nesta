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
      if (window.nesta && window.nesta.user) {
        require([ 'views/cms/page', 'markdown' ], function(PageView, markdown) {
          markdown.setOptions(window.nesta.markdown_opts);
          obj.page_view = new PageView({ el: obj.$el });
        });
      }
    }
  });
});
