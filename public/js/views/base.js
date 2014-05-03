/**
 * Base view
 * 
 */
define([ 'backbone' ], function(Backbone) {
  return Backbone.View.extend({

    showServerError: function() {
      alert('A server error has occurred!');
    }

  });
});
