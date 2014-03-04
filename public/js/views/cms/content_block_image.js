/**
 * Content block view
 * 
 */
define([
  'backbone',
  'collections/cms/images',
  'views/cms/images',
  'jade'
], function(
  Backbone,
  ImagesCollection,
  ImagesView,
  jade
) {
  return Backbone.View.extend({
    collection: new ImagesCollection,
    events: {
      'click .image_preview': 'editImages'
    },
    
    initialize: function(opts) {
      this.collection.fetch();
    },
    
    render: function(image_path) {
      var image          = this.collection.findWhere({ path: image_path }),
          $image_preview = this.$el.find('.image_preview'),
          existing_img   = $image_preview.find('img');
      if (image && (!existing_img.length || (existing_img.length &&
          existing_img.attr('src') != image_path))) {
        $image_preview.empty();
        $image_preview.append($('<img>').attr('src', image.get('path')));
      } else if (!image) {
        $image_preview.empty();
      }
    },

    editImages: function(ev) {
      var images_view = new ImagesView({
        collection: this.collection,
        el: this.el
      });
      images_view.modal();
    }
  });
});
