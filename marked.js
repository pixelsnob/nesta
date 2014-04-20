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

};

