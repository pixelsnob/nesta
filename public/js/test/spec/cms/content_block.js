
define([
  'views/cms/content_block',
  'models/cms/content_block',
  'jasmine-boot',
  'jasmine-jquery'
], function(
  ContentBlockView,
  ContentBlockModel
) {
  var view, model;
  describe('Content block editor', function() {
    beforeEach(function() {
      model = new ContentBlockModel({
        name: 'main',
        type: 'markdown',
        content: 'An image: ![test](/images/test.jpg)'
      });
      var el = $('<div>').addClass('content_block').append($('<div>')
        .addClass('content'));
      view = new ContentBlockView({ model: model, el: el });
      //view.render();
    });
    describe('When rendered', function() {
      it('renders html from markdown text', function() {
        //view.$el.find('.content').trigger('save');
        view.render();
        console.log(view.$el.html());
        //expect(view.render().find('.content_block').length).toBe(1);
      });
    });
  });
});

