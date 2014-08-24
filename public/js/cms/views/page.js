/**
 * Page view
 * 
 */
define([
  './base',
  './page_options',
  '../collections/files',
  '../models/page',
  './content_blocks',
  'template'
], function(
  BaseView,
  PageOptionsView,
  files,
  PageModel,
  ContentBlocksView,
  template
) {
  return BaseView.extend({
    el: 'body',
    model: new PageModel,
    events: {
      'click .page-options': 'showPageOptions'
    },

    initialize: function() {
      // Append publish/revert links, etc.
      this.$el.find('#content').prepend(template.render('cms/content_block_menu'));
      this.$el.find('footer ul.links').append(template.render('cms/page_menu'));
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
      var options_view = new PageOptionsView({ model: this.model });   
      options_view.renderModal();
    }

  });
});

