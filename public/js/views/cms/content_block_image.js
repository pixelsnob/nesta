/**
 * Content block view
 * 
 */
define([
  'backbone',
  'collections/cms/images',
  'jade'
], function(
  Backbone,
  ImagesCollection,
  jade
) {
  return Backbone.View.extend({
    collection: new ImagesCollection,
    events: {
    },
    
    initialize: function(opts) {
      //this.template = $(jade.render('cms_content_block_editor'));
      this.collection.fetch();
      this.listenTo(this.collection, 'sync', function() {
        console.log('sync');
      });
    },
    
    render: function(image_src) {
      var image = this.collection.findWhere({ path: image_src });
      this.$el.find('.image').empty();
      if (image) {
        this.$el.find('.image').append($('<img>').attr('src', image.get('path')));
      }
    },
    
    save: function(ev) {
    },
    
    showImage: function() {
    }

  });
});
