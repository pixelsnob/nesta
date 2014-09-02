/**
 * Image view
 * 
 */
define([
  '../base',
  './path_editor'
], function(BaseView, PathEditorView) {
  return BaseView.extend({
    
    model: null,
    
    tagName: 'tr',
    
    mode: 'readonly',

    events: {
      'click .path span':        'editPath',
      'click .remove':           'removeFile',
      'click .add-to-content':   'addToContent'
    },

    initialize: function() {
      this.listenTo(this.model, 'add', this.render);
      this.listenTo(this.model, 'remove', this.remove);
    },

    editPath: function(ev) {
      if (this.mode == 'edit') {
        return false;
      }
      this.mode = 'edit';
      var path = $(ev.currentTarget);
      var view = new PathEditorView({ model: this.model });
      path.empty().append(view.render());
      view.focus();
      var obj = this;
      this.listenTo(view, 'save cancel', function() {
        view.remove();
        obj.render();
        obj.mode = 'readonly';
      });
      return false;
    },

    removeFile: function() {
      var msg = 'Are you sure you want to delete this item?';
      var obj = this;
      if (confirm(msg)) {
        this.model.destroy({
          wait: true,
          error: _.bind(this.showServerError, this)
        });
      }
    },

    addToContent: function() {
      this.trigger('add-to-content', this.model.id);
    }
    
  });
});
