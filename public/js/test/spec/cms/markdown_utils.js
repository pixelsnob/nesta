
define([
  'lib/markdown_utils'
], function(
  markdown_utils
) {
  beforeEach(function() {
    
  });
  describe('Markdown image/link utility', function() {
    describe('When getTagPath() is called with type equals "image"', function() {
      it('should return the right path', function() {
        var text = '![test](/images/2.jpg)';
        var path = markdown_utils.getTagPath({
          text:       text,
          start_pos:  0,
          end_pos:    text.length,
          type:       'image'
        });
        expect(path).toBe('/images/2.jpg');
      });
    });
    describe('When getTagPath() is called with no type', function() {
      it('should return the right path', function() {
        var text = '[test](/sounds/sound.mp3)';
        var path = markdown_utils.getTagPath({
          text:       text,
          start_pos:  0,
          end_pos:    text.length
        });
        expect(path).toBe('/sounds/sound.mp3');
      });
    });
    describe('When insertTag() is called with type "image"', function() {
      it('should insert a markdown image tag into text at a specific start position', function() {
        var text = markdown_utils.insertTag({
          text:   'blah blah blah',
          path:   '/images/z.jpg',
          pos:    5,
          type:   'image'
        });
        expect(text).toBe('blah ![](/images/z.jpg) blah blah');
      });
    });
    describe('When insertTag() is called with no type', function() {
      it('should insert a markdown image tag into text at a specific start position', function() {
        var text = markdown_utils.insertTag({
          text:   'blah blah blah',
          path:   '/sounds/f.mp3',
          pos:    5
        });
        expect(text).toBe('blah [](/sounds/f.mp3) blah blah');
      });
    });
  });
});
