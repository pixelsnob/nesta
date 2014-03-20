/** 
 * jPlayer config and api
 * 
 */
define([ 'jplayer' ], function() {
  $('#player').jPlayer({
    supplied: 'mp3,m4v',
    swfPath: "/bower_components/jplayer/jquery.jplayer/Jplayer.swf",
    errorAlerts: true,
    warningAlerts: false
  });
});
