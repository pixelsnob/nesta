/**
 * Content block model
 * 
 */
define([
  'models/base'
], function(BaseModel) {
  return BaseModel.extend({
    defaults: {
      selected: 0
    }
  });
});
