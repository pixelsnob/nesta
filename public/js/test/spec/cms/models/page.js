
define([
  'cms/models/page',
  'sinon'
], function(
  PageModel,
  sinon
) {
  var model, server;
  var data = {
    '_id': '5390d8fd250c4a3450eb9aad',
    'path': 'index',
    'content_blocks': [
      {
        'name': 'main',
        'content': 'test',
        'type': 'markdown',
        '_id': '5390d8fd250c4a3450eb9aae'
      }
    ],
    'view': 'cms/pages/index',
    'description': 'description',
    'keywords': 'steel pan, steel drums, steel pans, steel drum, steel drummer, steel drum band',
    'title': 'Nesta Steel Drum Band - Steel Pan - Los Angeles'
  };

  describe('CMS page model', function() {
    beforeEach(function() {
      var page_model = PageModel.extend({ url: '/' });
      model = new page_model;
      server = sinon.fakeServer.create();
      server.respondWith('GET', '/', [
        200, { "Content-Type": "application/json" }, JSON.stringify(data)
      ]);
    });
    describe('When fetch() is called', function() {
      it('should be populated with data', function() {
        model.fetch();
        server.respond();
        expect(model.get('path')).toBe(data.path);
        expect(model.get('content_blocks').length).toBe(1);
      });
    });
    afterEach(function() {
      server.restore();
    });
  });
});
