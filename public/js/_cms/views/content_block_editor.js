/**
 * Content block view
 * 
 */
define([
  './base',
  './modal/form',
  '../collections/files',
  '../models/content_block',
  '../forms/content_block',
  './files/images',
  './files/sounds',
  'template',
  'lib/markdown_utils'
], function(
  BaseView,
  ModalFormView,
  files,
  ContentBlockModel,
  ContentBlockForm,
  ImagesView,
  SoundsView,
  template,
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
      'click .file-links a':        'addFile',
      'click .save':              'preview'
    },
    
    initialize: function(opts) {
      this.setElement(template.render('cms/content_block_editor'));
      this.$image_preview = this.$el.find('.image-preview');
      this.form = new ContentBlockForm({
        model: this.model
      });
      this.$el.find('.form').append(this.form.render().el);
    },
    
    focus: function() {
      this.form.fields.content.focus();
    },

    render: function() {
      return this.$el;
    },
    
    renderModal: function() {
      var modal_view = new ModalFormView({ form: this.form });
      this.listenTo(modal_view, 'open', this.focus);
      this.listenTo(modal_view, 'save', this.preview);
      modal_view.listenTo(this, 'preview', modal_view.hide);
      modal_view.modal({
        title: 'Edit Content Block',
        body: this.render(),
        save_label: 'Preview'
      });
    },

    preview: function() {
      if (this.form.validate() === null) {
        this.model.set(this.form.getValue());
        this.trigger('preview');
      }
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
      var $content = this.form.fields.content.$el.find('textarea');
      var path = markdown_utils.getTagPath({
        text:       $content.val(),
        start_pos:  $content.prop('selectionStart'),
        end_pos:    $content.prop('selectionEnd'),
        type:       'image'
      });
      if (path) {
        var model = files.images.where({ path: path.replace('/user/images/', '') });
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
      var $el = $(ev.currentTarget),
          type,
          path_prefix = '/user/';
      if ($el.hasClass('images')) {
        type = 'images';
      } else if ($el.hasClass('sounds')) {
        type = 'sounds';
      }
      var view = new this.subviews[type]({
        el: this.el,
        collection: files[type]
      });
      this.listenTo(view, 'save', function(model) {
        var $content  = this.form.fields.content.$el.find('textarea');
        var text = markdown_utils.insertTag({
          text:   $content.val(),
          path:   path_prefix + type + '/' + model.get('path'),
          pos:    $content.prop('selectionStart'),
          type:   type.substr(0, (type.length - 1))
        });
        $content.val(text);
        this.updateImagePreview();
        this.focus();
      });
      view.renderModal();
    }
  });
});
