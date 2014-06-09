
define([
  'cms/models/page',
  'fixtures',
  'sinon'
], function(
  PageModel,
  fixtures,
  sinon
) {
  var model, server;

  describe('CMS page model', function() {
    beforeEach(function() {
      var page_model = PageModel.extend({ url: '/' });
      model = new page_model;
      server = sinon.fakeServer.create();
      server.respondWith('GET', '/', [
        200, { "Content-Type": "application/json" }, JSON.stringify(fixtures.page)
      ]);
    });
    describe('When fetch() is called', function() {
      it('should be populated with data', function() {
        model.fetch();
        server.respond();
        expect(model.get('path')).toBe(fixtures.page.path);
        expect(model.get('content_blocks').length).toBe(1);
      });
    });
    afterEach(function() {
      server.restore();
    });
  });
});
