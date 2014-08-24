/**
 * Base view for a list of files
 * 
 */
define([
  '../base',
  '../modal/base',
  '../mixins/selectable_list',
  'template'
], function(
  BaseView,
  ModalView,
  SelectableListView,
  template
) {
  var view = BaseView.extend({
    
    collection:  null,
    upload_view: null,
    row_view:    null,

    initialize: function() {
      var upload_view = new this.upload_view({
        collection: this.collection
      });
      this.$el.find('.upload').html(upload_view.render());
      // Listen for sound uploads, to highlight uploaded sound
      this.listenTo(upload_view, 'upload', function(data) {
        if (typeof data._id == 'undefined') {
          alert('An error has ocurred');
          return;
        }
        var existing = this.collection.get(data._id);
        if (typeof existing == 'undefined') {
          this.collection.add(data);
        } else {
          this.collection.trigger('add', existing);
        }
      });
      this.listenTo(this.collection, 'add', function(model) {
        this.clearSelected();
        this.selectById(model.id);
        this.scrollToSelected();
      });
      upload_view.listenTo(this, 'cancel', upload_view.abort);
    },

    renderModal: function() {
      var modal_view = new ModalView,
          obj        = this;
      modal_view.listenTo(modal_view, 'save', function() {
        modal_view.hide();
        obj.trigger('save');
      });
      modal_view.modal({
        body: this.render(),
        save_label: 'Save'
      });
      this.listenTo(modal_view, 'cancel', _.bind(this.trigger, this, 'cancel'));
    }


  });

  return view.mixin(SelectableListView);
});

