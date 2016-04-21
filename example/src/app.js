var UTILS = {
		merge: require('object-assign'),
		assign: require('merge'),
		attributelist: require('storm-attributelist'),
		classlist: require('dom-classlist')
	},
    UI = (function(w, d) {
		'use strict';

		var Toggler = require('./libs/storm-toggler'),
			init = function() {
				global.STORM.Togglers = Toggler.init('.js-toggle');
                
                
                /*
                d.getElementById('js-test').addEventListener('click', function(){
                    global.STORM.Togglers.forEach(function(el){
                        !!el.open && el.toggle();
                    });
                });
                */
			};

		return {
			init: init
		};

	})(window, document, undefined);

global.STORM = {
    UTILS: UTILS,
    UI: UI
};


if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.UI.init, false);