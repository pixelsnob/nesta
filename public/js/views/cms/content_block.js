/**
 * Content block view
 * 
 */
define([
  'backbone',
  'models/cms/content_block',
  'views/cms/content_block_editor',
  'markdown',
  'jade'
], function(
  Backbone,
  ContentBlockModel,
  ContentBlockEditorView,
  markdown,
  jade
) {
  return Backbone.View.extend({
    model: new ContentBlockModel,
    events: {
      'click':            'edit',
      'click textarea':   function() { return false },
      'keyup':            'keyup',
      'click .save a':    'save',
      'click .cancel a':  'cancel'
    },
    initialize: function(opts) {
      this.editor_tpl = $(jade.render('cms_content_block'));
    },
    edit: function(ev) {
      if (this.$el.hasClass('editable')) {
        return false;
      }
      var textarea = this.editor_tpl.find('textarea')
        .width(this.$el.width())
        .height(window.document.documentElement.clientHeight - 200)
        .val(this.model.get('content_block').content);
      this.$el.empty();
      this.$el.append(this.editor_tpl);
      this.$el.addClass('editable');
      textarea.get(0).focus();
    },
    save: function(ev) {
      // Make sure "edit" doesn't fire
      this.model.get('content_block').content = this.$el.find('textarea').val();
      this.render();
      ev.stopPropagation();
    },
    cancel: function(ev) {
      // Make sure "edit" doesn't fire
      if (window.confirm('Unsaved changes will be lost! Continue?')) {
        this.render();
      }
      ev.stopPropagation();
    },
    keyup: function(ev) {
      // Cancel button
      if (ev.keyCode == 27) {
        this.cancel(ev);
      }
      ev.stopPropagation();
    },
    render: function() {
      console.log('render');
      var content = this.model.get('content_block').content;
      if (this.model.get('content_block').type == 'markdown') {
        content = markdown(content);
      }
      this.$el.empty();
      this.$el.append(content);
      this.$el.removeClass('editable');
      return this;
    }
  });
});
