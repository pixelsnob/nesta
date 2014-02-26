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
      'click':                     'edit',
      // Clicking a link inside a content_block won't trigger "edit"
      'click a':                   function(ev) { ev.stopPropagation(); },
      'keyup':                     'keyup',
      'click .save a':             'save',
      'click .cancel a':           'cancel'
    },
    initialize: function(opts) {
      this.editor_tpl = $(jade.render('cms_content_block_editor'));
    },
    edit: function(ev) {
      if (this.$el.hasClass('editable')) {
        return false;
      }
      var textarea = this.editor_tpl.find('textarea')
        .width(this.$el.width() - 20)
        .height(window.document.documentElement.clientHeight - 200)
        .val(this.model.get('content_block').content);
      this.$el.empty();
      this.$el.append(this.editor_tpl);
      this.$el.addClass('editable');
      textarea.get(0).focus();
      return false;
    },
    save: function(ev) {
      this.model.get('content_block').content = this.$el.find('textarea').val();
      this.render();
    },
    cancel: function(ev) {
      if (window.confirm('Unsaved changes will be lost! Continue?')) {
        this.render();
      } else {
        this.$el.find('textarea').get(0).focus();
      }
    },
    keyup: function(ev) {
      // Cancel button
      if (ev.keyCode == 27) {
        this.cancel(ev);
      }
    },
    render: function() {
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
