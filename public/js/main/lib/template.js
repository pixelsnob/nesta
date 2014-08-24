/** 
 * Configures a template engine
 * 
 */
define([ 'jade' ], function(jade) {
  return {
    render: function(template_path, opts) {
      return $(jade.render(template_path, opts));
    }
  };
});
