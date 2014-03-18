/** 
 * jPlayer config and api
 * 
 */
define([ 'jplayer' ], function() {
  $('#player').jPlayer({
    supplied: 'mp3',
    swfPath: "/bower_components/jplayer/jquery.jplayer/jquery.jplayer/Jplayer.swf",
    errorAlerts: false,
    warningAlerts: false
  });
});
