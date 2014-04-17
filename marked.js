/**
 * Configure marked (markdown interpreter) and add directly to app.locals
 * 
 */
var marked = require('marked')
    _      = require('underscore');

module.exports = function(app) {
  
  app.locals.marked_opts = {
    gfm: true,
    breaks: true,
    tables: true,
    sanitize: true, 
    smartypants: true
  };
  marked.setOptions(app.locals.marked_opts);
  
  app.locals.markdown = marked;

  /*var renderer = new marked.Renderer();
  app.locals.markdown = function(text) {
    return marked(text, { renderer: renderer });
  };

  // Add class="sound" to sound files
  renderer.link = function(href, title, text) {
    title = (title ? ' title="' + title + '"' : '');
    var html_class;
    if (href.match(/\.mp3$/)) {
      html_class = ' class="sound"';
    }
    return '<a href="' + href + '"' + html_class + title + '>' +
           text + '</a>';
  };
  */
};

