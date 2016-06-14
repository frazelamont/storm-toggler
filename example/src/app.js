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
				global.STORM.Togglers = Toggler.init('.js-toggle', {
                    callback: function() {
                        
                        togglerOnStates.forEach(function(state){
                            if(!!~document.documentElement.className.indexOf(state) && state !== this.statusClass) {
                                filteredTogglers.forEach(function (toggler) {
                                    if(toggler.statusClass === state) {
                                        toggler.toggleAttributes();
                                        toggler.toggleDocumentState();
                                    }
                                });
                            }
                        }.bind(this));
                    }
                });
                
                var togglerOnStates = global.STORM.Togglers.map(function(toggler){
                        return toggler.statusClass;
                    }).filter(function(value, index, self) { 
                        return self.indexOf(value) === index;
                    }),
                    filteredTogglers = [];
                
                global.STORM.Togglers.forEach(function(toggler){
                    var unique = true;
                    filteredTogglers.forEach(function(tog){
                        if(toggler.targetId === tog.targetId) { unique = false;}
                    });
                    !!unique && filteredTogglers.push(toggler);
                });
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