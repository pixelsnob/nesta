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
      page: {
        type: 'Text',
        validators: [ 'required' ]
      },
      title: {
        type: 'Text',
        validators: [ 'required' ]
      },
      description: {
        type: 'TextArea',
        validators: [ 'required' ]
      },
      keywords: {
        type: 'Text',
        validators: [ 'required' ]
      }
    }
  });
});
