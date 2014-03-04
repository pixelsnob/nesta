/**
 * Content block view
 * 
 */
define([
  'views/modal',
  'models/cms/content_block',
  'views/cms/content_block_image',
  'jade'
], function(
  ModalView,
  ContentBlockModel,
  ContentBlockImageView,
  jade
) {
  return ModalView.extend({
    model: new ContentBlockModel,
    events: {
      'click textarea':        'updateImagePreview',
      'keyup':                 'keyup'
    },
    
    initialize: function(opts) {
      this.setElement($(jade.render('cms_content_block_editor')));
      this.image_view = new ContentBlockImageView({ el: this.el });
    },

    modal: function() {
      var modal_view = new ModalView({ el: this.el });
      this.listenTo(modal_view, 'open', function() {
        this.$el.find('textarea').get(0).focus();
      });
      this.listenTo(modal_view, 'save', function() {
        this.save();
      });
      modal_view.modal({
        title: 'Edit Content Block',
        body: this.render(),
        save_label: 'Preview'
      });
    },
    
    render: function() {
      var content = this.model.get('content_block').content;
      this.$el.find('textarea').val(content);
      return this.$el;
    },
    
    save: function(ev) {
      // Must clone so that change events will fire correctly
      var content_block = _.clone(this.model.get('content_block'));
      content_block.content = this.$el.find('textarea').val();
      this.model.set('content_block', content_block);
      if (!this.model.hasChanged()) {
        this.trigger('saved');
      }
      this.updateImagePreview();
    },
    
    updateImagePreview: function() {
      var textarea   = this.$el.find('textarea'),
        text         = textarea.val(),
        // Get markdown images, format ![Name](path/to/image)
        images       = text.match(/!\[[^\]]*\]\([^\)]*\)/gi),
        sel_start    = textarea.prop('selectionStart'),
        sel_end      = textarea.prop('selectionEnd'),
        escape_regex = /([.*+?^=!:${}()|\[\]\/\\])/g,
        img          = this.$el.find('.image_preview img'),
        path         = '',
        obj          = this;

      for (var i in images) { 
        var escaped_image = images[i].replace(escape_regex, '\\$1');
        // Find all instances of current image in text
        var r = new RegExp(escaped_image, 'g');
        while ((m = r.exec(text)) !== null) {
          // See if cursor is in between start and end positions, inclusive
          if (sel_start >= m.index && sel_end <= m.index + images[i].length) {
            // Extract just the src from the markdown image tag
            var match = images[i].match(/\(([^\)]*)\)/);
            path  = '';
            if (typeof match[1] != 'undefined') {
              path = match[1];
            }
            break;
          }
        }
      }
      this.image_view.render(path);
    },

    keyup: function(ev) {
      /*if (ev.keyCode == 27) {
        return this.save();
      }*/
      this.updateImagePreview();
    }
  });
});
