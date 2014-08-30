/**
 * View for editing file "path" field
 * 
 */
define([
  '../base',
  '../../forms/file',
  'template'
], function(FileView, FileForm, template) {
  
  return FileView.extend({
    
    events: {
      'keyup input[name=path]':        'keyup',
      'keydown input[name=path]':      'keydown',
      'blur input[name=path]':         'blur'
    },
    
    initialize: function() {
      this.form = new FileForm({ model: this.model, fields: [ 'path' ] });
      this.setElement(this.form.render().el);
    },
    
    focus: function() {
      this.form.fields.path.focus();
    },
    
    keyup: function(ev) {
      if (ev.keyCode == 27) { // Esc
        ev.stopPropagation();
        this.trigger('cancel');
        this.model.set(this.model.previousAttributes());
        return false;
      }
    },

    keydown: function(ev) {
      if (ev.keyCode == 13) { // Return
        ev.stopPropagation();
        var errors   = this.form.fields.path.validate(),
            obj      = this;
        if (!errors) {
          this.model.save({ path: this.form.fields.path.getValue() }, {
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
        return false;
      }
    },
    
    blur: function() {
      this.trigger('cancel');
    },

    render: function() {
      return this.$el;
    }
  });
});

