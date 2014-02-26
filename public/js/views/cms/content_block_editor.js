/**
 * Content block view
 * 
 */
define([
  'backbone',
  'models/cms/content_block',
  'jade'
  //'markdown'
], function(Backbone, ContentBlockModel, jade) {
  return Backbone.View.extend({
    model: new ContentBlockModel,
    events: {
      'keyup textarea':    'keyup',
      'click .save':       'save',
      'cancel':            'cancel'
    },
    initialize: function(opts) {
      this.setElement(opts.el);
      this.model = opts.model;
    },
    save: function() {
      this.model.get('content_block').content = this.$el.find('textarea').val();
      ev.stopPropagation();
      this.render();
    },
    cancel: function() {
      if (window.confirm('Are you sure?')) {
        this.render();
      }
    },
    render: function() {
      var tpl = $(jade.render('cms_content_block'));
      var textarea = tpl.find('textarea')
        .width(this.$el.width())
        .height(window.document.documentElement.clientHeight - 200)
        .val(this.model.get('content_block').content);
      textarea.get(0).focus(); 
      return tpl;
    }
  });
});
