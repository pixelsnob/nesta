
/** 
 * View mixin
 * From https://gist.github.com/dmitry/1256695
 * 
 */
define([ 'backbone' ], function(Backbone) {
  Backbone.View.mixin = function(mixin) {
    var initialize = this.prototype.initialize;
    _.extend(this.prototype, mixin);
    _.extend(this.prototype.events, mixin.events);
    if (typeof mixin.initialize == 'function') {
      this.prototype.initialize = function () {
        mixin.initialize.apply(this);
        initialize.apply(this);
      };
    }
    return this;
  };
});

