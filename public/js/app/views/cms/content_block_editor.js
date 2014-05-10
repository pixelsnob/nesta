/**
 * Content block view
 * 
 */
define([
  'views/base',
  'views/cms/modal',
  'collections/cms/files',
  'models/cms/content_block',
  'views/cms/files/images',
  'views/cms/files/sounds',
  'jade',
  'lib/markdown_utils'
], function(
  BaseView,
  ModalView,
  files,
  ContentBlockModel,
  ImagesView,
  SoundsView,
  jade,
  markdown_utils
) {
  return BaseView.extend({
    
    model: new ContentBlockModel,
    
    timeout_id: null,

    subviews: {
      'images': ImagesView,
      'sounds': SoundsView
    },

    events: {
      'click textarea':           'textareaListener',
      'keyup textarea':           'textareaListener',
      'click .add-file a':        'addFile'
    },
    
    initialize: function(opts) {
      this.setElement($(jade.render('cms/content_block_editor')));
      this.$textarea = this.$el.find('textarea');
      this.$image_preview = this.$el.find('.image-preview');
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
      var content = this.model.get('content');
      this.$textarea.val(content);
      return this.$el;
    },
    
    save: function(ev) {
      // Must clone so that change events will fire correctly
      this.model.set('content', this.$textarea.val());
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
        var model = files.images.where({ path: path });
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
      var $parent = $(ev.currentTarget).parent(),
          type;
      if ($parent.hasClass('image')) {
        type = 'images';
      } else if ($parent.hasClass('sound')) {
        type = 'sounds';
      }
      var view = new this.subviews[type]({
        el: this.el,
        collection: files[type]
      });
      this.listenTo(view, 'modal_save', function() {
        var id = view.getSelectedId();
        if (id) {
          var model = files[type].get(id);
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
