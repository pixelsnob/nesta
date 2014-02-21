var
  db              = require('../db'),
  async           = require('async'),
  ContentBlock    = require('../models/content_block'),
  User            = require('../models/user'),
  Page            = require('../models/page'),
  Layout          = require('../models/layout');

/*db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});*/

db.connection.on('open', function() {

  var page_cb_ids   = [],
      layout_cb_ids = [],
      layout_id;

  async.waterfall([
    // Add content block(s)
    function(callback) {
      ContentBlock.collection.drop();
      ContentBlock.create({
        name: 'main',
        content: "# Top-Level Heading\n\n222222222222\n\nHello there, this is a paragraph. I can't believe this works.\n\n[A link](http://google.com)\n\nThis is a list:\n\n* A list item\n* Another\n* Yet another\n\ntesting\n\nIt's **very** easy to do **bold** and *italics* or\n\nIt's __very__ easy to do __bold__ and _italics_\n\n## A heading\n\nNice, this is rad.\n\n![A caterpillar, actually](/images/user/wormy.jpg \"Neat\")\n\n1. A numbered list\n2. Another item\n3. Cool\n5. ?\n\n## another heading\n\nBlah\n",
        type: 'markdown' 
      }, function(err, model) {
        if (err) {
          return callback(err);
        }
        page_cb_ids.push(model._id);
        callback();
      });
    },
    function(callback) {
      ContentBlock.create({
        name: 'footer',
        content: 'footer testxxx',
        type: 'markdown' 
      }, function(err, model) {
        if (err) {
          return callback(err);
        }
        layout_cb_ids.push(model._id);
        callback();
      });
    },
    function(callback) {
      Layout.collection.drop();
      Layout.create({
        file: 'cms_layout.jade',
        content_blocks: layout_cb_ids
      }, function(err, model) {
        if (err) {
          return callback(err);
        }
        layout_id = model._id;
        callback();
      });
    },
    // Add a page with refs to content blocks
    function(callback) {
      Page.collection.drop();
      Page.create({
        path: '/test/11',
        title: 'CMS Prototype Test Page',
        keywords: 'blah blah blah',
        description: 'This is a test.',
        layout: layout_id,
        content_blocks: page_cb_ids
      }, function(err, model) {
        if (err) {
          return callback(err);
        }
        callback();
      });
    },
    // Add user(s)
    function(callback) {
      User.collection.drop();
      User.create({
        username: 'luis',
        password: '1234',
        name: 'Luis'
      }, function(err) {
        if (err) {
          return callback(err);
        }
        callback();
      });
    }
  ], function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Done');
    }
    db.connection.close();
  });

});

