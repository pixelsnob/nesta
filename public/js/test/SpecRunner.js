
window.nesta = {
  user: { 'username': 'luis', 'name': 'Luis', '_id': '1'},
  markdown_opts: { 'gfm': true, 'breaks': true, 'tables': true, 'sanitize': true, 'smartypants': true }
};

define([ 'jasmine-boot', 'spec' ], function() {
  // Yuck, but this is how Jasmine does it...
  window.onload();
});


