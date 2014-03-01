/**
 * Content block view
 * 
 */
define([
  'backbone',
  'models/cms/content_block',
  'jade'
], function(
  Backbone,
  ContentBlockModel,
  jade
) {
  return Backbone.View.extend({
    model: new ContentBlockModel,
    events: {
      'blur textarea':             'save',
      'keyup':                     'keyup'
    },
    
    initialize: function(opts) {
      this.template = $(jade.render('cms_content_block_editor'));
    },
    
    render: function() {
      //var textarea = this.template.find('textarea')
      this.template
        .width(this.$el.width())
        .height(window.document.documentElement.clientHeight - 200);
      var textarea = this.template.find('textarea')
        .val(this.model.get('content_block').content);
      this.$el.empty();
      this.$el.append(this.template);
      textarea.get(0).focus();
      return this.$el;
    },
    
    save: function(ev) {
      // Must clone so that change events will fire correctly
      var content_block = _.clone(this.model.get('content_block'));
      content_block.content = this.$el.find('textarea').val();
      this.model.set('content_block', content_block);
      if (!this.model.hasChanged()) {
        this.trigger('saved');
      }
    },

    keyup: function(ev) {
      // Cancel button
      if (ev.keyCode == 27) {
        this.save();
      }
    }
  });
});
