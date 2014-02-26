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
      //'click .save a':                 'save',
      //'click .save_local a':           'saveLocal',
      //'click .revert_to_draft a':      'revertToDraft',
      //'click .revert a':               'revert',
      //'click .edit_options a':         'editOptions'
    },
    initialize: function() {
      /*this.listenTo(this.model, 'error', this.error);
      this.listenToOnce(this.model, 'change', this.postInit);
      this.listenTo(this.model, 'change sync', this.toggleSave);
      this.model.fetch();*/
      //this.content_blocks = new ContentBlocksView({ el: this.el });
      this.listenToOnce(this.model, 'change', _.bind(function(model) {
        this.content_blocks = new ContentBlocksView({
          el: this.el,
          content_blocks: model.get('content_blocks')
        });
      }, this));
      this.model.fetch();
    }
  });
});
