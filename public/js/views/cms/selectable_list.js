/**
 * Base view for crud-type list of items
 * 
 */
define([
  'views/cms/modal',
  'jade'
], function(
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
      //this.listenTo(this.collection, 'add', this.add);
      this.listenTo(this.collection, 'add remove', this.render);
      this.listenTo(this.collection, 'error', this.error);
      this.collection.fetch();
    },
    
    modal: function() {
      var modal_view = new ModalView({ el: this.el });
      this.listenTo(modal_view, 'save',
        _.bind(this.trigger, this, 'modal_save'));
      this.listenTo(modal_view, 'cancel',
        _.bind(this.trigger, this, 'modal_cancel'));
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
   
    scrollToSelected: function() {
      var scroller  = this.$el.find('.scroller'),
          selected  = this.$el.find('tr.selected');
      scroller.delay(500).animate({
        scrollTop: scroller.scrollTop() - scroller.offset().top +
                   selected.offset().top
      }, 100);
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
          model.destroy({ wait: true });
        }
      }
      return false;
    },
    
    render: function() {
      var obj = this;
      this.$el.find('table').empty();
      this.collection.each(_.bind(this.add, this));
      return this.$el;  
    },

    add: function(model) {
      var view = new this.row_view({ model: model });
      this.$el.find('table').append(view.render());
    }
  });
});

