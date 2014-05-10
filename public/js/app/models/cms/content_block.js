/**
 * Content block model
 * 
 */
define([
  'models/base'
], function(BaseModel) {
  return BaseModel.extend({
    url: function() {
      return '/cms/pages/' + this.page.id + '/content_blocks/' + this.id;
    },
    initialize: function() {
    }
  });
});

