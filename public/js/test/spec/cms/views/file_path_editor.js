
define([
  'cms/views/file/path_editor',
  'cms/models/file/image',
  'fixtures'
], function(
  PathEditorView,
  ImageModel,
  fixtures
) {
  var view, model;
  describe('File path editor', function() {
    
    beforeEach(function() {
      model = new ImageModel({
        _id: 1,
        path: '/user/images/test.jpg'
      });
      view = new PathEditorView({ model: model });
    });

    describe('When render() is called', function() {
      it('should render a form with a text input', function() {
        view.render();
        var $path = view.$el.find('input[name=path]');
        expect($path.length).toBe(1);
        expect($path.val()).toBe(model.get('path'));
      });
    });

  });

});

