/** 
 * Adds a csrf header to each request
 * 
 */
define([ 'backbone' ], function(Backbone) {
  var csrf = $('meta[name=csrf]').attr('content');
  // Override Backbone.sync to add csrf-token header
  Backbone.sync = (function(original) {
    return function(method, model, options) {
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('x-csrf-token', csrf);
      };
      original(method, model, options);
    };
  })(Backbone.sync);
});
