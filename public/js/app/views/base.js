/**
 * Base view
 * 
 */
define([ 'backbone' ], function(Backbone) {
  return Backbone.View.extend({

    showServerError: function(model, xhr) {
      if (typeof xhr != 'object') {
        return;
      }
      if (xhr.status == 403) {
        alert('You must be logged in to do that...');
      } else {
        alert('A server error has occurred!');
      }
    }

  });
});
