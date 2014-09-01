
define([ 'jasmine-boot', 'jasmine-jquery' ], function() {
  require([
    'test/spec/cms/views/content_block',
    'test/spec/cms/views/content_block_editor',
    'test/spec/cms/markdown_utils',
    'test/spec/cms/models/page',
    'test/spec/cms/views/page_options',
    'test/spec/cms/views/file_path_editor'
  ], function() {
    // Yuck, but this is how Jasmine does it...
    window.onload();
  });
});
