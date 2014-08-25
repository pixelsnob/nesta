/** 
 * Configures markdown
 * 
 */
define([ 'markdown' ], function(markdown) {
  if (window.nesta.markdown_opts) {
    markdown.setOptions(window.nesta.markdown_opts);
  }
  return markdown;
});
