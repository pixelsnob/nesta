/**
 * Page view
 * 
 */
define([
  'backbone',
  'models/cms/page',
  'views/cms/content_blocks'
], function(Backbone, PageModel, ContentBlocksView) {
  return Backbone.View.extend({
    model: new PageModel,
    events: {
      'click .publish a':      'publish',
      'click .revert a':       'revert',
    },

    initialize: function() {
      // Append publish/revert links, etc.
      this.$el.find('#content').prepend(jade.render('cms/page_controls'));
      this.$el.find('.cms_page_controls').hide();
      this.listenTo(this.model, 'error', this.error);
      var obj = this;
      this.listenToOnce(this.model, 'change', function(model) {
        obj.content_blocks = new ContentBlocksView({
          el: obj.el,
          collection: model.content_blocks
        });
        obj.listenTo(model, 'change sync', function(model) {
          obj.toggleControls();
        });
      });
      this.model.fetch();
    },
    
    toggleControls: function() {
      var el = this.$el.find('.cms_page_controls');
      if (this.model.hasChanged()) {
        el.show();
      } else {
        el.hide();
      }
    },
    
    publish: function(ev) {
      this.model.save(this.model.attributes, { wait: true });
      return false;
    },
    
    revert: function() {
      this.model.revert();
      return false;
    },

    error: function(model, xhr, opts) {
      if (typeof xhr.responseJSON != 'object') {
        alert('An error has occurred');
        return;
      }
      var res = xhr.responseJSON;
      if (typeof res.message == 'string') {
        if (window.confirm(res.message + ': revert?')) {
          this.revert();
        }
        return;
      }
      if (xhr.status === 403) { 
        alert('You must be logged in to do that...');
        window.location.href = '/login';
      } else {
        alert('An error has occurred');
      }
    }
  });
});
