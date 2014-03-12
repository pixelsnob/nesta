/**
 * Content block view
 * 
 */
define([
  'views/modal',
  'models/cms/content_block',
  'collections/cms/images',
  'collections/cms/sound_files',
  'views/cms/images',
  'views/cms/sound_files',
  'jade',
  'lib/markdown_utils'
], function(
  ModalView,
  ContentBlockModel,
  ImagesCollection,
  SoundFilesCollection,
  ImagesView,
  SoundFilesView,
  jade,
  markdown_utils
) {
  return ModalView.extend({
    model: new ContentBlockModel,
    events: {
      'click textarea':         'textListener',
      'keyup textarea':         'textListener',
      'click .add_image a':     'addImage',
      'click .add_sound_file a':     'addSoundFile'
    },
    
    initialize: function(opts) {
      this.setElement($(jade.render('cms/content_block_editor')));
      this.$textarea = this.$el.find('textarea');
      this.$el.find('.image_preview img').hide();
      this.images_collection = new ImagesCollection;
      this.images_collection.fetch();
      this.sounds_collection = new SoundFilesCollection;
      this.sounds_collection.fetch();
    },
    
    textListener: function() {
      this.updateImagePreview(); 
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

    updateImagePreview: function() {
      var img = this.$el.find('.image_preview img');
      var path = markdown_utils.getTagPath({
        text:       this.$textarea.val(),
        start_pos:  this.$textarea.prop('selectionStart'),
        end_pos:    this.$textarea.prop('selectionEnd'),
        type:       'image'
      });
      if (path) {
        img.attr('src', path).show();
        this.$el.find('.add_image').hide();
      } else {
        img.hide();
        this.$el.find('.add_image').show();
      }
    },
    
    addImage: function(ev) {
      var images_view = new ImagesView({
        el: this.el,
        collection: this.images_collection
      });
      this.listenTo(images_view, 'modal_save', function() {
        var id = images_view.getSelectedId();
        if (id) {
          this.insertMarkdownImage(id);
        }
        this.$textarea.get(0).focus();
      });
      images_view.modal();
    },
    
    addSoundFile: function(ev) {
      var sound_files_view = new SoundFilesView({
        el: this.el,
        collection: this.sounds_collection
      });
      this.listenTo(sound_files_view, 'modal_save', function() {
        var id = sound_files_view.getSelectedId();
        if (id) {
          //this.insertMarkdownImage(id);
          alert(id);
        }
        this.$textarea.get(0).focus();
      });
      sound_files_view.modal();
    },
    
    insertMarkdownImage: function(id) {
      var model = this.images_collection.get(id);
      if (model) {
        var text = markdown_utils.insertTag({
          text: this.$textarea.val(),
          path: model.get('path'),
          pos:  this.$textarea.prop('selectionStart'),
          type: 'image'
        });
        this.$textarea.val(text);
        this.updateImagePreview();
      }
    }
  });
});
