/**
 * @name storm-toggler: Accessible UI state toggling
 * @version 1.1.0: Fri, 05 May 2017 10:05:22 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.StormToggler = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defaults = require('./lib/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _componentPrototype = require('./lib/component-prototype');

var _componentPrototype2 = _interopRequireDefault(_componentPrototype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));

	if (!els.length) throw new Error('Toggler cannot be initialised, no augmentable elements found');

	return els.map(function (el) {
		return Object.assign(Object.create(_componentPrototype2.default), {
			btn: el,
			targetId: (el.getAttribute('href') || el.getAttribute('data-target')).substr(1),
			settings: Object.assign({}, _defaults2.default, opts)
		}).init();
	});
};

exports.default = { init: init };;
}));
