
define([
  'cms/views/content_block',
  'cms/models/content_block',
  'markdown',
  'template'
], function(
  ContentBlockView,
  ContentBlockModel,
  markdown,
  template
) {
  var view, model;
  describe('Content block', function() {
    beforeEach(function() {
      model = new ContentBlockModel({
        name: 'main',
        type: 'markdown',
        content: 'An image: ![test](/images/test.jpg)'
      });
      var $el = $(template.render('cms/content_block', {
        markdown: markdown,
        class_names: '',
        content: model.get('content')
      }));
      view = new ContentBlockView({ model: model, el: $el });
    });
    describe('When rendered', function() {
      it('renders html from markdown text', function() {
        view.render();
        expect(view.$el.find('.content').length).toBe(1);
        expect(view.$el.find('.content').html()).toContain('<p>An image: <img src="/images/test.jpg" alt="test"></p>');
      });
    });
  });
});

