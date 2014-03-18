/**
 * Content block view
 * 
 */
define([
  'views/base',
  'models/cms/content_block',
  'views/cms/content_block_editor',
  'markdown',
  'jade'
], function(
  BaseView,
  ContentBlockModel,
  ContentBlockEditorView,
  markdown,
  jade
) {
  return BaseView.extend({
    model: new ContentBlockModel,
    events: {
      'click':    'edit'
    },
    
    initialize: function(opts) {
      this.listenTo(this.model, 'change', function(model) {
        this.render();
      });
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
      editor_view.modal();
    },
    
    render: function() {
      var content = this.model.get('content_block').content;
      if (this.model.get('content_block').type == 'markdown') {
        content = markdown(content);
      }
      this.$el.empty();
      this.$el.append(content);
      return this;
    }
  });
});
