/**
 * App base model
 * 
 */
define([
  'backbone'
], function(Backbone) {
  return Backbone.Model.extend({
    idAttribute: '_id',
    saved: {},
    storage: window.localStorage,
    initialize: function() {
      // Save a copy fetched from the server for comparisons, etc.
      this.listenTo(this, 'sync', function(model) {
        this.saved = _.clone(this.attributes);
      });
    },
    saveLocal: function() {
      if (typeof this.storage != 'undefined') {
        this.storage.setItem(this.url, JSON.stringify(this));
      }
    },
    fetchLocal: function() {
      if (typeof this.storage != 'undefined') {
        return JSON.parse(this.storage.getItem(this.url));
      }
    },
    localEqualsCurrent: function() {
      return _.isEqual(this.attributes, this.fetchLocal());
    },
    hasChanged: function() {
      return !_.isEqual(this.saved, this.attributes);
    },
    revert: function() {
      this.set(this.saved);
    }
  });
});

