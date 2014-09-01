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
      'click .path span': 'editPath'
    },

    initialize: function() {
      this.listenTo(this.model, 'add', this.render);
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
    }
    
  });
});
