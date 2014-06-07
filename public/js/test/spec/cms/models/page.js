
define([
  'cms/models/page',
  'sinon'
], function(
  PageModel,
  sinon
) {
  var model;
  describe('CMS page model', function() {
    beforeEach(function() {
      model = new PageModel;
    });
    describe('When something', function() {
      it('should do something', function() {
        var spy = sinon.spy();
        model.bind('change', spy);
        model.set('description', 'test');
        expect(spy.calledOnce).toBeTruthy();
      });
    });
  });
});
