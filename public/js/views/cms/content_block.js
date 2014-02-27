/**
 * Content block view
 * 
 */
define([
  'backbone',
  'models/cms/content_block',
  'markdown',
  'jade'
], function(
  Backbone,
  ContentBlockModel,
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
      this.listenTo(this.model, 'change', function(model) {
        this.render();
      });
    },
    edit: function(ev) {
      if (this.$el.hasClass('editing')) {
        return false;
      }
      var textarea = this.editor_tpl.find('textarea')
        .width(this.$el.width())
        .height(window.document.documentElement.clientHeight - 200)
        .val(this.model.get('content_block').content);
      this.$el.empty();
      this.$el.append(this.editor_tpl);
      this.$el.addClass('editing');
      textarea.get(0).focus();
      return false;
    },
    save: function(ev) {
      // Must clone so that change events will fire correctly
      var content_block = _.clone(this.model.get('content_block'));
      content_block.content = this.$el.find('textarea').val();
      this.model.set('content_block', content_block);
      if (!this.model.hasChanged()) {
        this.render();
      }
    },
    cancel: function(ev) {
      ///if (!this.model.hasChanged()) {
      //  return this.render();
     // }
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
      this.$el.removeClass('editing');
      return this;
    }
  });
});
