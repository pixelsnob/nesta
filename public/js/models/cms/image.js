/**
 * Content block model
 * 
 */
define([
  'models/base'
], function(BaseModel) {
  return BaseModel.extend({
    url: function() {
      return '/cms/images/' + this.id;
    }
  });
});
