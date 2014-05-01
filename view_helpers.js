
var _    = require('underscore'),
    jade = require('jade');

module.exports = function(app) {
  app.locals.outputContentBlock = function(name, page) {
    var page_content_block = _.findWhere(page.content_blocks, { name: name });
    if (page_content_block) {
      var locals = _.extend(app.locals, {
        name: name,
        content: page_content_block.content_block.content
      });
      return jade.renderFile('./views/cms/content_block.jade', locals);
    }
  };
};
