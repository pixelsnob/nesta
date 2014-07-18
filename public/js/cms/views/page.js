/**
 * Page view
 * 
 */
define([
  './base',
  './modal/form',
  './page_options',
  '../collections/files',
  '../models/page',
  './content_blocks'
], function(
  BaseView,
  ModalFormView,
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
      this.$el.find('#content').prepend(jade.render('cms/content_block_menu'));
      this.$el.find('footer').append(jade.render('cms/page_menu'));
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
      var modal_view = new ModalFormView({ model: this.model, form: view.form });
      view.listenTo(modal_view, 'open', view.focus);
      modal_view.modal({ body: view.render().el });
    }

  });
});

