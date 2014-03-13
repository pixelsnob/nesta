/**
 * List of images
 * 
 */
define([
  'backbone',
  'views/selectable_list',
  'collections/cms/images',
  'views/cms/image',
  'views/cms/image_upload',
  'jade'
], function(
  Backbone,
  SelectableListView,
  ImagesCollection,
  ImageView,
  ImageUploadView,
  jade
) {
  return SelectableListView.extend({
    
    collection: ImagesCollection,
    
    initialize: function() {
      SelectableListView.prototype.initialize.apply(this);
      this.setElement($(jade.render('cms/images')));
      var image_upload_view = new ImageUploadView({
        collection: this.collection
      });
      this.$el.find('.image_upload').html(image_upload_view.render());
      // Listen for image uploads, to highlight uploaded image
      this.listenTo(image_upload_view, 'upload', function(data) {
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
        var image_view = new ImageView({ model: model });
        obj.$el.find('table').append(image_view.render());
      });
      return this.$el;  
    }
  });
});

