/**
 * Markdown text utilities
 * 
 * 
 */
define([ 'markdown' ], function(markdown) {
  var escape_regex = /([.*+?^=!:${}()|\[\]\/\\])/g;
  return {
    /**
     * Returns image path of a markdown image tag, if any, between the
     * specified indices in text
     * 
     */
    getImagePath: function(text, start_pos, end_pos) {
      var images = text.match(/!\[[^\]]*\]\([^\)]*\)/gi);
      for (var i in images) { 
        var escaped_image = images[i].replace(escape_regex, '\\$1');
        // Find all instances of current image in text
        var r = new RegExp(escaped_image, 'g');
        while ((m = r.exec(text)) !== null) {
          // See if cursor is in between start and end positions, inclusive
          if (start_pos >= m.index && end_pos <= m.index + images[i].length) {
            // Extract just the src from the markdown image tag
            var match = images[i].match(/\(([^\)]*)\)/);
            return (typeof match[1] != 'undefined' ? match[1] : null);
          }
        }
      }
    },

    /**
     * Inserts a markdown image tag into the text with a given path
     * 
     */
    insertImage: function(text, image_path, pos) {
      var tag = '![](' + image_path + ')';
      return text.slice(0, pos) + tag + text.slice(pos + 1, text.length);
    }
  };
});
