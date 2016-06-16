/**
 * spa.js
 * Root namespace module
 */

var spa = (function () {
	var initModule = function ( $container ) {
		$container.html(
          + '<div class="spa-shell-head">'
              + '<div class="spa-shell-head-logo"></div>'
              + '<div class="spa-shell-head-acct"></div>'
              + '<div class="spa-shell-head-search"></div>'
          + '</div>'
          + '<div class="spa-shell-main">'
              + '<div class="spa-shell-main-nav"></div>'
              + '<div class="spa-shell-main-content"></div>'
          + '</div>'
          + '<div class="spa-shell-foot"></div>'
          + '<div class="spa-shell-chat">'
              + '<div class="spa-shell-modal"></div>'
          + '</div>'
		);
	}

	return { initModule: initModule };
}());