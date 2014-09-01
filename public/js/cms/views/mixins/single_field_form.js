/**
 * Basic form functionality
 * 
 */
define([
  'template'
], function(
  template
) {
  return {

    events: {
      'keyup input[name=path]':        'keyup',
      'keydown input[name=path]':      'keydown',
      'blur input[name=path]':         'blur'
    },
    
    initialize: function() {
    },
    
    focus: function() {
      this.form.fields.path.focus();
    },
    
    keyup: function(ev) {
      if (ev.keyCode == 27) { // Esc
        ev.stopPropagation();
        this.model.set(this.model.previousAttributes());
        this.trigger('cancel');
        return false;
      }
    },

    keydown: function(ev) {
      if (ev.keyCode == 13) { // Return
        ev.stopPropagation();
        this.save();
        return false;
      }
    },

    save: function() {
      var errors   = this.form.fields.path.validate(),
          obj      = this;
      if (!errors) {
        this.model.save(this.form.getValue(), {
          wait: true,
          validate: false,
          success: function(model) {
            obj.trigger('save');
            obj.form.commit();
          },
          error: function() {
            obj.form.fields.path.setError('Server error');
          }
        });
      }
    },
    
    blur: function() {
      this.trigger('cancel');
    }
  };
});

