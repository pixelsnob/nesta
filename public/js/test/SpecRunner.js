
define([ 'jasmine-boot', 'jasmine-jquery' ], function() {
  require([
    './test/spec/cms/content_block',
    './test/spec/cms/content_block_editor',
    './test/spec/cms/markdown_utils'
  ], function() {
    // Yuck, but this is how Jasmine does it...
    window.onload();
  });
});
