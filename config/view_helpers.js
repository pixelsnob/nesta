
'use strict';

var _    = require('underscore'),
    jade = require('jade');

module.exports = function(app) {
  app.locals.outputContentBlock = function(name, page) {
    var content_block = _.findWhere(page.content_blocks, { name: name });
    if (content_block) {
      var locals = _.extend(app.locals, {
        name: name,
        content: content_block.content,
        class_names: content_block.class_names
      });
      return jade.renderFile('./views/cms/content_block.jade', locals);
    }
  };
};
