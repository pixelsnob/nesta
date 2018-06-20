/**
 * Configure marked (markdown interpreter) and add directly to app.locals
 * 
 */
'use strict';

var marked = require('marked');

module.exports = function(app) {
  app.locals.marked_opts = {
    gfm: true,
    breaks: false,
    tables: true,
    sanitize: false, 
    smartypants: false
  };
  marked.setOptions(app.locals.marked_opts);
  app.locals.markdown = marked;
};

