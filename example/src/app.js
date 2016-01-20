var STORMUI = (function(w, d) {
	'use strict';
    
    var StormToggler = require('./libs/storm.toggler'),
        init = function() {
            StormToggler.init(d.querySelectorAll('.js-toggle'));
            StormToggler.init(d.querySelectorAll('.js-toggle--sub'), {targetLocal: true});
        };
	
	return {
		init: init
	};
	
})(window, document, undefined);

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORMUI.init, false);