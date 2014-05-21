
define([
  'views/cms/content_block_editor',
  'models/cms/content_block',
  'jasmine-boot',
  'jasmine-jquery'
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
      });
      it('whose value should be "testing"', function() {
        expect(view.render().find('textarea').val()).toBe('testing');
      });
    });
    describe('When updateImagePreview() is called', function() {
      it('image preview should be hidden', function() {
        view.updateImagePreview();
        expect(view.$image_preview).toBeHidden();
      });
    });
  });
});
