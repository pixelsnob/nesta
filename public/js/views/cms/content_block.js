/**
 * Content block view
 * 
 */
define([
  'backbone',
  'models/cms/content_block',
  'markdown'
], function(Backbone, ContentBlockModel, markdown) {
  return Backbone.View.extend({
    model: new ContentBlockModel,
    events: {
      'click':            'edit',
      'click textarea':   function() { return false },
      'blur textarea':    'saveLocal',
      // Disable links in editable content block
      'click a':          function() { this.edit(); return false; }
    },
    initialize: function(opts) {
      this.listenTo(this.model, 'change', this.render);
    },
    edit: function() {
      this.$el.empty();
      // Create a textarea and size it so that it fits inside the viewport
      var textarea = $('<textarea>')
        .width(this.$el.width())
        .height(window.document.documentElement.clientHeight - 200)
        .val(this.model.get('content_block').content);
      this.$el.append(textarea);
      textarea.get(0).focus();
    },
    saveLocal: function() {
      this.model.get('content_block').content = this.$el.find('textarea').val();
      this.render();
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
