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
      'blur textarea':             'save',
      'keyup':                     'keyup'
    },
    
    initialize: function(opts) {
      this.$overlay = $('#overlay');
      this.listenTo(this.model, 'change', function(model) {
        this.render();
      });
    },
    
    edit: function(ev) {
      if (this.$el.hasClass('editing')) {
        return false;
      }
      this.$overlay.show();
      var textarea = $('<textarea>')
        .width(this.$el.width())
        .height(window.document.documentElement.clientHeight - 200)
        .val(this.model.get('content_block').content);
      this.$el.empty();
      this.$el.append(textarea);
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
      var has_not_changed = (this.model.get('content_block').content ==
                            this.$el.find('textarea').val());
      if (has_not_changed) {
        return this.render();
      }
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
      this.$overlay.hide();
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
