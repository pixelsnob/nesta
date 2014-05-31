/**
 * Content block view
 * 
 */
define([
  './base',
  './modal',
  '../models/content_block',
  './content_block_editor',
  'lib/markdown',
  'jade'
], function(
  BaseView,
  ModalView,
  ContentBlockModel,
  ContentBlockEditorView,
  markdown,
  jade
) {
  return BaseView.extend({
    
    events: {
      'click .content':   'edit',
      'click .publish':   'save',
      'click .revert':    'revert'
    },
    
    initialize: function(opts) {
      this.model.page = opts.page;
      this.listenTo(this.model, 'change', this.render);
    },
    
    edit: function(ev) {
      // Kind of cheesy that I have to do this, but I can't get :not(a)
      // selector to work on the "edit" click event...
      if (ev.target.tagName == 'A') {
        ev.preventDefault();
        return;
      }
      var editor_view = new ContentBlockEditorView({
        el: this.el,
        model: this.model
      });
      var modal_view = new ModalView;
      editor_view.listenTo(modal_view, 'save', editor_view.save);
      editor_view.listenTo(modal_view, 'open', editor_view.focus);
      modal_view.modal({
        title: 'Edit Content Block',
        body: editor_view.render(),
        save_label: 'Preview'
      });
    },
    
    render: function() {
      var content = this.model.get('content');
      if (this.model.get('type') == 'markdown') {
        content = markdown(content);
      }
      var $content = this.$el.find('.content');
      $content.empty();
      $content.append(content);
      this.addMenu();
      return this;
    },
    
    save: function() {
      this.model.save(this.model.attributes, {
        wait: true,
        success: _.bind(this.removeMenu, this),
        error:   _.bind(this.showServerError, this)
      });
    },
    
    revert: function() {
      this.model.fetch({
        success: _.bind(this.removeMenu, this),
        error:   _.bind(this.showServerError, this)
      });
    },
    
    addMenu: function() {
      if (!this.$el.find('.content-block-menu').length) {
        this.$el.append($(jade.render('cms/content_block_menu')));
      }
    },
    
    removeMenu: function() {
      this.$el.find('.content-block-menu').remove();
    }
    
  });
});
