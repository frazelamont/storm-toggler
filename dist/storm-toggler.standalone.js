/**
 * @name storm-toggler: Class and ARIA toggle UI state manipulation
 * @version 0.11.0: Tue, 08 Nov 2016 17:31:07 GMT
 * @author mjbp
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
var defaults = {
	delay: 200,
	targetLocal: false,
	callback: null
};

var StormToggler = {
	init: function init() {
		var _this = this;

		this.targetElement = document.getElementById(this.targetId);
		this.classTarget = !this.settings.targetLocal ? document.documentElement : this.targetElement.parentNode;
		this.siblingBtns = [].slice.call(document.querySelectorAll('.js-toggle[href*="#' + this.targetId + '"], .js-toggle[data-target*="#' + this.targetId + '"]'));

		if (!this.settings.targetLocal) {
			this.statusClass = 'on--' + this.targetId;
			this.animatingClass = 'animating--' + this.targetId;
		} else {
			this.statusClass = 'active';
			this.animatingClass = 'animating';
		}

		this.btn.setAttribute('role', 'button');
		this.btn.setAttribute('aria-controls', this.targetId);
		this.btn.setAttribute('aria-expanded', 'false');

		this.btn.addEventListener('click', function (e) {
			_this.toggle.call(_this, e);
		});

		return this;
	},

	toggleAttributes: function toggleAttributes() {
		this.open = !this.open;
		this.siblingBtns.forEach(function (sibling) {
			sibling.setAttribute('aria-expanded', !sibling.getAttribute('aria-expanded'));
		});
	},
	toggleDocumentState: function toggleDocumentState() {
		this.classTarget.classList.remove(this.animatingClass);
		this.classTarget.classList.toggle(this.statusClass);
	},
	toggle: function toggle(e) {
		var _this2 = this;

		var delay = this.classTarget.classList.contains(this.statusClass) ? this.settings.delay : 0;

		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		this.classTarget.classList.add(this.animatingClass);

		window.setTimeout(function () {
			_this2.toggleAttributes();
			_this2.toggleDocumentState();
			!!_this2.settings.callback && typeof _this2.settings.callback === 'function' && _this2.settings.callback.call(_this2);
		}, delay);
	}
};

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));

	if (!els.length) throw new Error('Toggler cannot be initialised, no augmentable elements found');

	return els.map(function (el) {
		return Object.assign(Object.create(StormToggler), {
			btn: el,
			targetId: (el.getAttribute('href') || el.getAttribute('data-target')).substr(1),
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

exports.default = { init: init };;
}));
