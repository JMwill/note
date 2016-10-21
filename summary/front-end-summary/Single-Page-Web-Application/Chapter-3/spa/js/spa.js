'use strict';
/**
 * spa.js
 * Root namespace module
 */
/* jslint          browser : true,  continue : true,
    devel   : true, indent : 2,     maxerr   : 50,
    newcap  : true, nomen  : true,  plusplus : true,
    regexp  : true, sloppy : true,  vars     : true,
    white   : true
*/
/* global $, spa */
var spa = (function() {
	var initModule = function ($container) {
        spa.shell.initModule($container)
	};

	return { initModule: initModule };
}());
// var spa = (function () {
// 	var initModule = function ( $container ) {
// 		$container.html(
//           + '<div class="spa-shell-head">'
//               + '<div class="spa-shell-head-logo"></div>'
//               + '<div class="spa-shell-head-acct"></div>'
//               + '<div class="spa-shell-head-search"></div>'
//           + '</div>'
//           + '<div class="spa-shell-main">'
//               + '<div class="spa-shell-main-nav"></div>'
//               + '<div class="spa-shell-main-content"></div>'
//           + '</div>'
//           + '<div class="spa-shell-foot"></div>'
//           + '<div class="spa-shell-chat">'
//               + '<div class="spa-shell-modal"></div>'
//           + '</div>'
// 		);
// 	}
//
// 	return { initModule: initModule };
// }());
