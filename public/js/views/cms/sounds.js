/**
 * List of sound files
 * 
 */
define([
  'backbone',
  'views/selectable_list',
  'collections/cms/sounds',
  'views/cms/sound',
  'views/cms/sound_upload',
  'jade'
], function(
  Backbone,
  SelectableListView,
  SoundsCollection,
  SoundView,
  SoundUploadView,
  jade
) {
  return SelectableListView.extend({
    
    collection: SoundsCollection,
    
    initialize: function() {
      SelectableListView.prototype.initialize.apply(this);
      this.setElement($(jade.render('cms/sounds')));
      var sound_upload_view = new SoundUploadView({
        collection: this.collection
      });
      this.$el.find('.sound_upload').html(sound_upload_view.render());
      // Listen for sound uploads, to highlight uploaded sound
      this.listenTo(sound_upload_view, 'upload', function(data) {
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
        var sound_view = new SoundView({ model: model });
        obj.$el.find('table').append(sound_view.render());
      });
      return this.$el;  
    }
  });
});

