/**
 * Page view
 * 
 */
define([
  'backbone',
  'models/cms/page',
  'views/cms/content_blocks'
  //'views/cms/options'
], function(Backbone, PageModel, ContentBlocksView) {
  return Backbone.View.extend({
    model: new PageModel,
    events: {
      'click .publish a':                 'publish',
      //'click .save_local a':           'saveLocal',
      //'click .revert_to_draft a':      'revertToDraft',
      'click .revert a':               'revert',
      //'click .edit_options a':         'editOptions'
    },

    initialize: function() {
      // Append publish/revert links, etc.
      this.$el.find('#content').prepend(jade.render('cms_page_controls'));
      this.$el.find('.cms_page_controls').hide();
      this.listenTo(this.model, 'error', this.error);
      this.listenToOnce(this.model, 'change', _.bind(function(model) {
        this.content_blocks = new ContentBlocksView({
          el: this.el,
          collection: this.model.content_blocks
        });
      }, this));
      // Show or hide publish/revert links if content has changed
      this.listenTo(this.model, 'change', _.bind(function(model) {
        this.toggleControls();
      }, this));
      this.model.fetch();
    },

    toggleControls: function() {
      var el = this.$el.find('.cms_page_controls');
      if (this.model.hasChanged() && this.model.changed_count > 1) {
        el.show();
      } else {
        el.hide();
      }
    },
    
    publish: function(ev) {
      this.model.save(this.model.attributes, { wait: true });
      return false;
    },
    
    // Revert to last fetched version
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
