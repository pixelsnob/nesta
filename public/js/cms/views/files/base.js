/**
 * Base view for a list of files
 * 
 */
define([
  '../base',
  '../mixins/selectable_list',
  'jade'
], function(
  BaseView,
  SelectableListView,
  jade
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
      this.listenTo(this, 'modal_cancel', function() {
        upload_view.abort();
      });
    }
  });

  return view.mixin(SelectableListView);
});

