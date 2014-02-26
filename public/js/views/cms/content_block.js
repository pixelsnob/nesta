/**
 * Content block view
 * 
 */
define([
  'backbone',
  'models/cms/content_block'
  //'markdown',
  //'views/cms/content_block_form'
], function(Backbone, ContentBlockModel) {
  return Backbone.View.extend({
    model: new ContentBlockModel,
    events: {
      'click':            'edit',
      'click textarea':   function() { return false },
      // Disable links in editable content block
      'click a':          function() { this.edit(); return false; }
    },
    initialize: function(opts) {
      this.listenTo(this.model, 'change', this.render);
    },
    edit: function() {
      var textarea = $('<textarea>')
        .width(this.$el.width())
        // Make it fit inside the viewport
        .height(window.document.documentElement.clientHeight - 200)
        .val(this.model.get('content_block').content);
      this.$el.empty();
      this.$el.append(textarea);
    },
    modal: function() {
      this.form_view.modal();
    },
    render: function() {
      console.log('render');
      return;
      var content = this.model.get('content');
      if (this.model.get('type') == 'markdown') {
        content = markdown(content);
      }
      this.$el.empty();
      this.$el.append(content);
      return this;
    }
  });
});
