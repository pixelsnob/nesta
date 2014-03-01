/**
 * Content block view
 * 
 */
define([
  'backbone',
  'models/cms/content_block',
  'jade'
], function(
  Backbone,
  ContentBlockModel,
  jade
) {
  return Backbone.View.extend({
    model: new ContentBlockModel,
    events: {
      'click .editor_close':       'save',
      'click textarea':            'selectImage',
      'keyup':                     'keyup'
    },
    
    initialize: function(opts) {
      this.template = $(jade.render('cms_content_block_editor'));
    },
    
    render: function() {
      //var textarea = this.template.find('textarea')
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
    
    selectImage: function() {
      var textarea = this.template.find('textarea'),
        text       = textarea.val(),
        // Get markdown images, format ![Name](path/to/image)
        images     = text.match(/!\[[^\]]*\]\([^\)]*\)/g),
        sel_start  = textarea.prop('selectionStart'),
        sel_end    = textarea.prop('selectionEnd'),
        image      = '';

      for (var i in images) {
        // Get start and end position
        var img_start = text.indexOf(images[i]),
            img_end   = img_start + images[i].length;
        // See if the cursor is between (or next to one of) the two positions
        // and select
        if (sel_start >= img_start && sel_end <= img_end) {
          //textarea.get(0).setSelectionRange(img_start, img_end);
          image = images[i];
        }
      }
      // Add check to see if this image is already showing
      this.$el.find('.image').empty();
      if (image) {
        var path = image.match(/\(([^\)]*)\)/);
        this.$el.find('.image').append($('<img>').attr('src', path[1]));
      }
    },

    keyup: function(ev) {
      // Cancel button
      if (ev.keyCode == 27) {
        return this.save();
      }
      this.selectImage();
    }
  });
});
