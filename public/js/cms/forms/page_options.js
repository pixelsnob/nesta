/**
 * Form for editing page metadata
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(Backbone) {
  return Backbone.Form.extend({
    schema: {
      title: {
        type: 'TextArea',
        validators: [ 'required' ]
      },
      description: {
        type: 'TextArea',
        validators: [ 'required' ]
      },
      keywords: {
        type: 'TextArea',
        validators: [ 'required' ]
      }
    }
  });
});
