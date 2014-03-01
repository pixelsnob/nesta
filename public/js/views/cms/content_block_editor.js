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
      //'blur textarea':       'save',
      'click textarea':            'selectImage',
      'keyup':                     'keyup'
    },
    
    initialize: function(opts) {
      this.template = $(jade.render('cms_content_block_editor'));
      var obj = this;
      $(window.document).on('click', function(ev) {
        if ($(ev.target).attr('id') == 'overlay') {
          obj.save();
        }
      })
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
      // Need to escape markdown image for use in a regex
      var escape_regex = /([.*+?^=!:${}()|\[\]\/\\])/g;
      for (var i in images) {
        var escaped_image = images[i].replace(escape_regex, '\\$1');
        var r = new RegExp(escaped_image, 'g');
        while ((m = r.exec(text)) !== null) {
          if (sel_start >= m.index && sel_end <= m.index + images[i].length) {
            image = images[i];
            break;
          }
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
