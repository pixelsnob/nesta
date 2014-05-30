
define([
  'cms/views/content_block_editor',
  'cms/models/content_block'
], function(
  ContentBlockEditorView,
  ContentBlockModel
) {
  var view, model;
  describe('Content block editor', function() {
    beforeEach(function() {
      model = new ContentBlockModel({
        name: 'main',
        type: 'markdown',
        content: 'testing'
      });
      view = new ContentBlockEditorView({ model: model });
    });
    describe('When rendered', function() {
      it('renders a textarea', function() {
        expect(view.render().find('textarea').length).toBe(1);
        expect(view.render().find('textarea').val()).toBe('testing');
      });
    });
  });
});
