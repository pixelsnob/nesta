/**
 * Image view
 * 
 */
define([
  '../base',
  './file_path_editor'
], function(BaseView, FilePathEditorView) {
  return BaseView.extend({
    
    model: null,
    
    tagName: 'tr',
    
    mode: 'readonly',

    events: {
      'click .path': 'editPath'
    },

    initialize: function() {
    },

    editPath: function(ev) {
      if (this.mode == 'edit') {
        return false;
      }
      this.mode = 'edit';
      var path = $(ev.currentTarget);
      var view = new FilePathEditorView({ model: this.model });
      path.empty().append(view.render());
      view.focus();
      var obj = this;
      this.listenTo(view, 'save cancel', function() {
        view.remove();
        obj.render();
        obj.mode = 'readonly';
      });
      return false;
    }
    
  });
});
