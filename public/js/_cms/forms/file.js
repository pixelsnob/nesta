/**
 * Form for an image file
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(Backbone) {
  
  function validatePath(value, form_values) {
    if (!value.match(/^[a-z0-9\-\._]+$/i)) {
      return { message: 'Illegal characters' };
    }
  }

  return Backbone.Form.extend({
    schema: {
      path: {
        type: 'Text',
        validators: [ 'required', validatePath ]
      }
    }
  });
});


