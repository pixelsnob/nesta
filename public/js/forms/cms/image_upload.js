/**
 * Image upload form
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(Backbone) {
  //console.log(Backbone.Form);
  return Backbone.Form.extend({
    schema: {
      name: {
        type: 'file',
        validators: [ 'required' ]
      }
    }
  });
});
