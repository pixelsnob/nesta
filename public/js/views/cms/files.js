/**
 * Base view for a list of files
 * 
 */
define([
  'backbone',
  'views/selectable_list',
  'jade'
], function(
  Backbone,
  SelectableListView,
  jade
) {
  return SelectableListView.extend({
    
    collection: null,
    
    upload_view: null,
    
    row_view: null,

    initialize: function() {
      SelectableListView.prototype.initialize.apply(this);
      var upload_view = new this.upload_view({
        collection: this.collection
      });
      this.$el.find('.upload').html(upload_view.render());
      // Listen for sound uploads, to highlight uploaded sound
      this.listenTo(upload_view, 'upload', function(data) {
        this.collection.add(data);
        this.clearSelected();
        if (typeof data._id != 'undefined') {
          this.selectById(data._id);
        }
      });
    },
    
    render: function() {
      var obj = this;
      this.$el.find('table').empty();
      this.collection.each(function(model) {
        var view = new obj.row_view({ model: model });
        obj.$el.find('table').append(view.render());
      });
      return this.$el;  
    }
  });
});

