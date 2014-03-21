/**
 * Content block view
 * 
 */
define([
  'views/modal',
  'models/cms/content_block',
  'collections/cms/files/images',
  'views/cms/files/images',
  'collections/cms/files/sounds',
  'views/cms/files/sounds',
  'collections/cms/files/videos',
  'views/cms/files/videos',
  'jade',
  'lib/markdown_utils'
], function(
  ModalView,
  ContentBlockModel,
  ImagesCollection,
  ImagesView,
  SoundsCollection,
  SoundsView,
  VideosCollection,
  VideosView,
  jade,
  markdown_utils
) {
  return ModalView.extend({
    
    model: new ContentBlockModel,
    
    timeout_id: null,

    collections: {
      'images': new ImagesCollection,
      'sounds': new SoundsCollection,
      'videos': new VideosCollection
    },
    
    subviews: {
      'images': ImagesView,
      'sounds': SoundsView,
      'videos': VideosView
    },

    events: {
      'click textarea':           'textareaListener',
      'keyup textarea':           'textareaListener',
      'click .add_file a':        'addFile'
    },
    
    initialize: function(opts) {
      this.setElement($(jade.render('cms/content_block_editor')));
      this.$textarea = this.$el.find('textarea');
      this.$image_preview = this.$el.find('.image_preview');
      _.each(this.collections, function(collection) {
        collection.fetch();
      });
    },
    
    modal: function() {
      var modal_view = new ModalView({ el: this.el });
      this.listenTo(modal_view, 'open', function() {
        this.$textarea.get(0).focus();
      });
      this.listenTo(modal_view, 'save', this.save);
      modal_view.modal({
        title: 'Edit Content Block',
        body: this.render(),
        save_label: 'Preview'
      });
    },
    
    render: function() {
      var content = this.model.get('content_block').content;
      this.$textarea.val(content);
      return this.$el;
    },
    
    save: function(ev) {
      // Must clone so that change events will fire correctly
      var content_block = _.clone(this.model.get('content_block'));
      content_block.content = this.$textarea.val();
      this.model.set('content_block', content_block);
      if (!this.model.hasChanged()) {
        this.trigger('saved');
      }
      this.updateImagePreview();
    },
    
    textareaListener: function(ev) {
      var obj = this;
      if (!this.timeout_id) {
        this.timeout_id = setTimeout(function() {
          clearTimeout(obj.timeout_id);
          obj.timeout_id = null;
          obj.updateImagePreview();
        }, 300);
      }
    },

    updateImagePreview: function() {
      var img   = this.$image_preview.find('img'),
          error = this.$image_preview.find('.error');
      error.empty();
      var path = markdown_utils.getTagPath({
        text:       this.$textarea.val(),
        start_pos:  this.$textarea.prop('selectionStart'),
        end_pos:    this.$textarea.prop('selectionEnd'),
        type:       'image'
      });
      if (path) {
        var model = this.collections.images.where({ path: path });
        if (model.length) {
          img.attr('src', path).show();
        } else {
          img.hide();
          error.text('Image does not exist');
        }
      } else {
        img.hide();
      }
    },
    
    /** 
     * Opens up a modal with a list of images or sounds to choose from.
     * On modal close, inserts a markdown tag at the cursor's position
     * 
     */
    addFile: function(ev) {
      var parent = $(ev.currentTarget).parent(),
          type;
      if (parent.hasClass('image')) {
        type = 'images';
      } else if (parent.hasClass('sound')) {
        type = 'sounds';
      } else if (parent.hasClass('video')) {
        type = 'videos';
      }
      var view = new this.subviews[type]({
        el: this.el,
        collection: this.collections[type]
      });
      this.listenTo(view, 'modal_save', function() {
        var id = view.getSelectedId();
        if (id) {
          var model = this.collections[type].get(id);
          if (model) {
            var text = markdown_utils.insertTag({
              text:   this.$textarea.val(),
              path:   model.get('path'),
              pos:    this.$textarea.prop('selectionStart'),
              type:   type.substr(0, (type.length - 1))
            });
            this.$textarea.val(text);
            this.updateImagePreview();
          }
        }
        this.$textarea.get(0).focus();
      });
      view.modal();
    }
  });
});
