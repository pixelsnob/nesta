/**
 * Base view
 * 
 */
define([ 'backbone' ], function(Backbone) {
  return Backbone.View.extend({

    error: function(model, xhr, opts) {
      if (typeof xhr.responseJSON != 'object') {
        console.error('A server error has occurred');
        return;
      }
      /*var res = xhr.responseJSON;
      if (typeof res.message == 'string') {
        if (window.confirm(res.message + ': revert?')) {
          this.revert();
        }
        return;
      }*/
      if (xhr.status === 403) { 
        alert('You must be logged in to do that...');
        window.location.href = '/login';
      } else {
        console.error('A server error has occurred');
      }
    }
  });
});
