/**
 * Page view
 * 
 */
define([
  'views/base',
  'views/cms/page'
], function(BaseView, PageView) {
  return BaseView.extend({
    el: 'body',
    
    initialize: function() {
      this.page_view = new PageView({ el: this.$el });
    }
  });
});
