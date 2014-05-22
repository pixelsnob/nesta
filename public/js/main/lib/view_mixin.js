
/** 
 * View mixin
 * From https://gist.github.com/dmitry/1256695
 * 
 */
define([ 'backbone' ], function(Backbone) {
  Backbone.View.mixin = function(view, mixin) {
    _.defaults(view.prototype, mixin);
    _.defaults(view.prototype.events, mixin.events);
    if (typeof mixin.initialize == 'function') {
      var old_initialize = view.prototype.initialize;
      view.prototype.initialize = function () {
        mixin.initialize.apply(this);
        old_initialize.apply(this);
      };
    }
  };
});

