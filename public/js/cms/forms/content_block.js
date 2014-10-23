/**
 * Form for content block editor
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(Backbone) {
  
  return Backbone.Form.extend({
    schema: {
      content: {
        type: 'TextArea',
        validators: [ 'required' ]
      },
      class_names: {
        title: 'Class Names',
        type: 'TextArea'
      }
    }
  });
});


