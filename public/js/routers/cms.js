/**
 * CMS router
 * 
 */
define([
  'backbone',
  'views/app'
], function(Backbone, AppView) {
  return Backbone.Router.extend({ 
    routes: {
      '/edit':                'test'
    },
    initialize: function(opts) {
    },
    test: function() {

    }
  });
});
