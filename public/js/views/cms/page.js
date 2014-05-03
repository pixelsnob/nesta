/**
 * Page view
 * 
 */
define([
  'views/base',
  'collections/cms/files',
  'models/cms/page',
  'views/cms/content_blocks'
], function(
  BaseView,
  files,
  PageModel,
  ContentBlocksView
) {
  return BaseView.extend({
    model: new PageModel,
    events: {
      'click .publish':      'publish',
      'click .revert':       'revert'
    },

    initialize: function() {
      // Append publish/revert links, etc.
      this.$el.find('#content').prepend(jade.render('cms/page_controls'));
      this.$menu = this.$el.find('.content-block-menu');
      this.$menu.hide();
      var obj = this;
      $.when(
        this.model.fetch(),
        files.images.fetch(),
        files.sounds.fetch()
      ).done(function(model) {
        obj.content_blocks = new ContentBlocksView({
          el: obj.el,
          collection: obj.model.content_blocks
        });
        obj.listenTo(obj.model, 'change sync', function(model) {
          obj.toggleControls();
        });
      }).fail(this.showServerError);
    },
    
    toggleControls: function() {
      var el = this.$el.find('.cms_page_controls');
      if (this.model.hasChanged()) {
        this.$menu.show();
      } else {
        this.$menu.hide();
      }
    },
    
    publish: function(ev) {
      this.model.save(this.model.attributes, {
        wait: true,
        error: _.bind(this.showServerError, this)
      });
      return false;
    },
    
    revert: function() {
      this.model.revert();
      return false;
    }

  });
});
