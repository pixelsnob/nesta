/** 
 * jPlayer config and api
 * 
 */
define([ 'jplayer' ], function() {
  var j = $('#player');
  j.jPlayer({
    ready: function () {
    },
    supplied: 'mp3',
    swfPath: "/bower_components/jplayer/jquery.jplayer/jquery.jplayer/Jplayer.swf",
    errorAlerts: false,
    warningAlerts: false
  });
});
