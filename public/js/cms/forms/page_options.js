/**
 * Form for editing page metadata
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(Backbone) {
  
  var noNewlines = function(value, form_values) {
    if (/\r|\n/.test(value)) {
      return { message: 'No newlines allowed in this field' };
    }
  };

  return Backbone.Form.extend({
    schema: {
      title: {
        type: 'TextArea',
        validators: [ 'required', noNewlines ]
      },
      description: {
        type: 'TextArea',
        validators: [ noNewlines ]
      },
      keywords: {
        type: 'TextArea',
        validators: [ noNewlines ]
      }
    }
  });
});


