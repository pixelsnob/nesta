/**
 * Sound file model
 * 
 */
define([
  'models/base'
], function(BaseModel) {
  return BaseModel.extend({
    url: function() {
      return '/cms/sounds/' + this.id;
    }
  });
});
