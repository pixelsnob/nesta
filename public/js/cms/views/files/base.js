/**
 * Base view for a list of files
 * 
 */
define([
  '../base',
  '../modal/base',
  'template'
], function(
  BaseView,
  ModalView,
  template
) {
  
  return BaseView.extend({
    
    collection:  null,
    upload_view: null,
    row_view:    null,

    events: {
    },

    initialize: function() {
      this.setElement(template.render('cms/files'));
      this.listenTo(this.collection, 'add', this.render);
      var upload_view = new this.upload_view({
        collection: this.collection
      });
      this.$el.find('.upload').html(upload_view.render());
      // Listen for sound uploads, to highlight uploaded sound
      this.listenTo(upload_view, 'upload', function(data) {
        if (typeof data._id == 'undefined') {
          alert('An error has ocurred');
          return;
        }
        var existing = this.collection.get(data._id);
        if (typeof existing != 'undefined') {
          // Force add, since adding an existing model won't trigger add event
          this.collection.remove(existing);
        }
        // Force reload of cached file, if any
        data.last_update = (new Date).getTime();
        this.collection.add(data);
      });
      this.listenTo(this.collection, 'add', function(model) {
        this.scrollTo(model);
      });
      upload_view.listenTo(this, 'cancel', upload_view.abort);
    },

    render: function() {
      var obj = this;
      this.$el.find('table').empty();
      this.collection.each(_.bind(this.add, this));
      return this.$el;  
    },
    
    add: function(model) {
      var view = new this.row_view({ model: model });
      this.$el.find('table').append(view.render());
      this.listenTo(view, 'add-to-content', function() {
        this.trigger('add-to-content', model);
      });
    },
    
    scrollTo: function(model) {
      var scroller  = this.$el.find('.scroller'),
          selected  = this.$el.find('tr#' + model.id);
      scroller.delay(500).animate({
        scrollTop: scroller.scrollTop() - scroller.offset().top +
                   selected.offset().top
      }, 1);
    },
    
    renderModal: function() {
      var modal_view = new ModalView,
          obj        = this;
      modal_view.listenTo(modal_view, 'save', function() {
        modal_view.hide();
      });
      modal_view.modal({
        body: this.render(),
        save_label: 'Close',
        hide_cancel_button: true
      });
      this.listenTo(modal_view, 'cancel', _.bind(this.trigger, this, 'cancel'));
      this.listenTo(this, 'add-to-content', function(model) {
        this.trigger('save', model);
        modal_view.hide();
      });
    }
  });
});

