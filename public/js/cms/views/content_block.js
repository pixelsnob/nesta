/**
 * Content block view
 * 
 */
define([
  './base',
  '../models/content_block',
  './content_block_editor',
  'lib/markdown',
  'template'
], function(
  BaseView,
  ContentBlockModel,
  ContentBlockEditorView,
  markdown,
  template
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
      // Don't edit when links (or children of links) are clicked!
      var $el = $(ev.target);
      if ($el.prop('tagName') == 'A' || $el.parents('a').length) {
        return;
      }
      var editor_view = new ContentBlockEditorView({
        el: this.el,
        model: this.model
      });
      editor_view.renderModal();
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
      // Update .content class names
      $content.attr('class', 'content ' + this.model.get('class_names'));
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
        this.$el.append(template.render('cms/content_block_menu'));
      }
    },
    
    removeMenu: function() {
      this.$el.find('.content-block-menu').remove();
    }
    
  });
});
