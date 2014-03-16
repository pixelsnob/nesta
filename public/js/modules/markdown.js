/** 
 * Configures markdown
 * 
 */
define([ 'markdown_lib' ], function(markdown) {
  if (window.nesta.markdown_opts) {
    markdown.setOptions(window.nesta.markdown_opts);
  }
  return markdown;
});
