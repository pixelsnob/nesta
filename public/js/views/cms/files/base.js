/**
 * Base view for a list of files
 * 
 */
define([
  'views/selectable_list',
  'jade'
], function(
  SelectableListView,
  jade
) {
  return SelectableListView.extend({
    
    collection:  null,
    upload_view: null,
    row_view:    null,

    initialize: function() {
      SelectableListView.prototype.initialize.apply(this);
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
          this.collection.add(data, { sort: true });
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
});

