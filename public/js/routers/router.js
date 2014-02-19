/**
 * Main router
 * 
 */
define([
  'backbone',
  'views/app'
], function(Backbone, AppView) {
  return Backbone.Router.extend({ 
    routes: {
      
    },
    initialize: function() {
      // Add CMS functionality if user is logged in
      if (window.app_data.user) {
        require([ 'routers/cms' ], _.bind(function(CmsRouter) {
          _.defaults(this, CmsRouter.prototype);
          _.defaults(this.routes, CmsRouter.prototype.routes);
          CmsRouter.prototype.initialize.apply(this);
        }, this));
      }
    }
  });
});
