var STORM = (function(w, d) {
	'use strict';
    
    var Toggler = require('./libs/storm-toggler'),
        init = function() {
            Toggler.init('.js-toggle');
        };
	
	return {
		init: init
	};
	
})(window, document, undefined);

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.init, false);