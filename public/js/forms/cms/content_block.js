/**
 * Form for editing a content block
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(Backbone) {
  return Backbone.Form.extend({
    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      },
      content: {
        type: 'TextArea',
        validators: [ 'required' ]
      },
      type: {
        type: 'Text',
        validators: [ 'required' ]
      }
    }
  });
});
