/**
 * Base view
 * 
 */
define([ 'backbone' ], function(Backbone) {
  return Backbone.View.extend({

    showServerError: function(model, xhr) {
      console.log(this);
      if (xhr.status == 403) {
        alert('You must be logged in to do that...');
      } else {
        alert('A server error has occurred!');
      }
    }

  });
});
