/**
 * Base view for crud-type list of items
 * 
 */
define([
  'backbone',
  'views/modal',
  'jade'
], function(
  Backbone,
  ModalView,
  jade
) {
  return ModalView.extend({
    
    events: {
      'click tr':         'select',
      'click .remove a':  'remove'
    },
    
    initialize: function() {
      this.setElement($(jade.render('cms/selectable_list')));
      this.listenTo(this.collection, 'sync add remove', this.render);
      this.collection.fetch();
    },
    
    modal: function() {
      var modal_view = new ModalView({ el: this.el });
      this.listenTo(modal_view, 'save', function() {
        this.trigger('modal_save');
      });
      modal_view.modal({
        body: this.render()
      });
    },
    
    select: function(ev) {
      this.clearSelected();
      $(ev.currentTarget).addClass('selected');
    },
    
    selectById: function(id) {
      this.$el.find('tr[id=' + id + ']').addClass('selected');
    },

    getSelectedId: function() {
      var selected = this.$el.find('tr.selected');
      if (selected.length) {
        return selected.attr('id');
      }
    },

    clearSelected: function() {
      this.$el.find('tr.selected').removeClass('selected');
    },

    remove: function(ev) {
      var msg = 'Are you sure you want to delete this item?';
      if (confirm(msg)) {
        var id = $(ev.currentTarget).closest('tr').attr('id');
        var model = this.collection.get(id);
        if (model) {
          model.destroy();
        }
      }
      return false;
    }
  });
});

