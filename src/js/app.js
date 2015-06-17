/*global window, document, console, require*/
var STORM = (function(w, d) {
	'use strict';
    
    var toggler = require('./libs/toggler'),
        init = function() {
            toggler.init(d.querySelectorAll('.js-toggle'));
        };
	
	return {
		init: init
	};
	
})(window, document, undefined);

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.init, false);