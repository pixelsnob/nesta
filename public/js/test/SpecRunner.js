
window.nesta = {
  user: { 'username': 'luis', 'name': 'Luis', '_id': '1'},
  markdown_opts: { 'gfm': true, 'breaks': true, 'tables': true, 'sanitize': true, 'smartypants': true }
};

define([
  'jasmine-boot',
  'jasmine-jquery',
  '../test/spec/cms/content_block',
  '../test/spec/cms/markdown_utils'
], function() {
  // Yuck, but this is how Jasmine does it...
  window.onload();
});


