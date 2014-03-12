/**
 * List of images
 * 
 */
define([
  'backbone',
  'views/selectable_list',
  'collections/cms/sound_files',
  'views/cms/sound_file',
  'views/cms/sound_file_upload',
  'jade'
], function(
  Backbone,
  SelectableListView,
  SoundFilesCollection,
  SoundFileView,
  SoundFileUploadView,
  jade
) {
  return SelectableListView.extend({
    collection: new SoundFilesCollection,
    
    initialize: function() {
      SelectableListView.prototype.initialize.apply(this);
      this.setElement($(jade.render('cms/sound_files')));
      this.listenTo(this.collection, 'sync add remove', this.render);
      var sound_file_upload_view = new SoundFileUploadView({
        collection: this.collection
      });
      this.$el.find('.sound_file_upload').html(
        sound_file_upload_view.render());
      // Listen for image uploads, to highlight uploaded file
      this.listenTo(sound_file_upload_view, 'upload', function(data) {
        this.collection.add(data);
        this.clearSelected();
        if (typeof data._id != 'undefined') {
          this.$el.find('tr[id=' + data._id + ']').addClass('selected');
        }
      });
    },
    
    render: function() {
      var obj = this;
      this.$el.find('table').empty();
      this.collection.each(function(model) {
        var image_view = new SoundFileView({ model: model });
        obj.$el.find('table').append(image_view.render());
      });
      return this.$el;  
    }
  });
});

