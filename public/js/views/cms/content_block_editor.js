/**
 * Content block view
 * 
 */
define([
  'backbone',
  'models/cms/content_block',
  'views/cms/content_block_image',
  'jade'
], function(
  Backbone,
  ContentBlockModel,
  ContentBlockImageView,
  jade
) {
  return Backbone.View.extend({
    model: new ContentBlockModel,
    events: {
      'click .editor_close':   'save',
      'click textarea':        'showImage',
      'keyup':                 'keyup'
    },
    
    initialize: function(opts) {
      this.template = $(jade.render('cms_content_block_editor'));
      //this.template.find('.image_links').hide();
      this.image_view = new ContentBlockImageView({ el: this.el });
      var obj = this;
      $(window.document).on('click', function(ev) {
        if ($(ev.target).attr('id') == 'overlay') {
          obj.save();
        }
      });
    },
    
    render: function() {
      this.template
        .width(this.$el.width())
        .height(window.document.documentElement.clientHeight - 200);
      var textarea = this.template.find('textarea')
        .val(this.model.get('content_block').content).get(0);
      this.$el.empty();
      this.$el.append(this.template);
      textarea.focus();
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
    },
    
    showImage: function() {
      var textarea   = this.template.find('textarea'),
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
      // No image
      this.image_view.render(path);
    },

    keyup: function(ev) {
      // Cancel button
      if (ev.keyCode == 27) {
        return this.save();
      }
      this.showImage();
    }
  });
});