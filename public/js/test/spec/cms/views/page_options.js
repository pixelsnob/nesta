
define([
  'cms/views/page_options',
  'cms/models/page',
  'fixtures'
], function(
  PageOptionsView,
  PageModel,
  fixtures
) {
  var view, model;
  describe('Page Options View', function() {
    
    beforeEach(function() {
      model = new PageModel(fixtures.page);
      view = new PageOptionsView({ model: model });
    });
    describe('When render() is called', function() {
      it('should render a form with the correct form elements', function() {
        var $el = view.render().$el;
        var $title = $el.find('textarea[name=title]')
        expect($title.length).toBe(1);
        expect($title.val()).toBe(fixtures.page.title);
      });
    });
    describe('When form is committed with correct values', function() {
      it('should not error', function() {
        view.render();
        var errors = view.form.commit();
        expect(errors).toBeUndefined();
      });
    });
    describe('When form with a missing value is committed', function() {
      it('should give a "required" error', function() {
        var $el = view.render().$el;
        var $title = $el.find('textarea[name=title]');
        $title.val('');
        var errors = view.form.commit();
        expect(errors.title.message).not.toBeUndefined();
      });
    });
    describe('When form is committed with a newline ', function() {
      it('should give a "no newlines" error', function() {
        var $el = view.render().$el;
        var $description = $el.find('textarea[name=description]');
        $description.val("\n");
        var errors = view.form.commit();
        expect(errors.description.message).not.toBeUndefined();
      });
    });
  });
});

