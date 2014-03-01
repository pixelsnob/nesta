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
      'click a':                   function(ev) { ev.stopPropagation(); }
    },
    
    initialize: function(opts) {
      this.$overlay = $('#overlay');
      this.listenTo(this.model, 'change', function(model) {
        this.render();
      });
      this.editor_view = new ContentBlockEditorView({
        el: this.el,
        model: this.model
      });
      this.listenTo(this.editor_view, 'saved', function() {
        this.render();
      });
    },
    
    edit: function(ev) {
      if (this.$el.hasClass('editing')) {
        return false;
      }
      this.$overlay.show();
      this.$el.addClass('editing');
      this.editor_view.render();
    },
    
    render: function() {
      var content = this.model.get('content_block').content;
      if (this.model.get('content_block').type == 'markdown') {
        content = markdown(content);
      }
      this.$overlay.hide();
      this.$el.empty();
      this.$el.append(content);
      this.$el.removeClass('editing');
      return this;
    }
  });
});
