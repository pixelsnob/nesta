/**
 * Page view
 * 
 */
define([
  './base',
  './page_options',
  '../collections/files',
  '../models/page',
  './content_blocks'
], function(
  BaseView,
  PageOptionsView,
  files,
  PageModel,
  ContentBlocksView
) {
  return BaseView.extend({
    el: 'body',
    model: new PageModel,
    events: {
      'click .page-options': 'showPageOptions'
    },

    initialize: function() {
      // Append publish/revert links, etc.
      this.$el.find('#content')
        .prepend(jade.render('cms/content_block_menu'))
        .append(jade.render('cms/page_menu'));
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
          collection: obj.model.content_blocks,
          page: obj.model
        });
      }).fail(_.bind(this.showServerError, this));
    },
    
    showPageOptions: function(ev) {
      var view = new PageOptionsView({ model: this.model });   
      view.modal();
    }

  });
});
