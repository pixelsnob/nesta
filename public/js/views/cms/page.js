/**
 * Page view
 * 
 */
define([
  'views/base',
  'models/cms/page',
  'views/cms/content_blocks'
], function(BaseView, PageModel, ContentBlocksView) {
  return BaseView.extend({
    model: new PageModel,
    events: {
      'click .publish a':      'publish',
      'click .revert a':       'revert',
    },

    initialize: function() {
      // Append publish/revert links, etc.
      this.$el.find('#content').prepend(jade.render('cms/page_controls'));
      this.$el.find('.cms_page_controls').hide();
      this.listenTo(this.model, 'error', this.error);
      var obj = this;
      this.listenToOnce(this.model, 'change', function(model) {
        obj.content_blocks = new ContentBlocksView({
          el: obj.el,
          collection: model.content_blocks
        });
        obj.listenTo(model, 'change sync', function(model) {
          obj.toggleControls();
        });
      });
      this.model.fetch();
    },
    
    toggleControls: function() {
      var el = this.$el.find('.cms_page_controls');
      if (this.model.hasChanged()) {
        el.show();
      } else {
        el.hide();
      }
    },
    
    publish: function(ev) {
      this.model.save(this.model.attributes, { wait: true });
      return false;
    },
    
    revert: function() {
      this.model.revert();
      return false;
    }

  });
});
