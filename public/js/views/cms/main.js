/**
 * Page view
 * 
 */
define([
  'views/cms/page'
], function(PageView) {
  return BaseView.extend({
    
    el: 'body',
    
    initialize: function() {
      this.page_view = new PageView({ el: this.$el });
    }
  });
});
