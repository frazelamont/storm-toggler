/**
 * @name storm-toggler: Accessible UI state toggling
 * @version 1.3.2: Fri, 06 Oct 2017 11:11:56 GMT
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
var defaults = {
	delay: 0,
	startOpen: false,
	local: false,
	prehook: false,
	callback: false,
	focus: true,
	trapTab: false
};

var TRIGGER_EVENTS = ['click', 'keydown'];
var TRIGGER_KEYCODES = [13, 32];

var componentPrototype = {
	init: function init() {
		var _this = this;

		this.targetElement = document.getElementById(this.targetId);
		this.classTarget = !this.settings.local ? document.documentElement : this.targetElement.parentNode;
		this.siblingBtns = [].slice.call(document.querySelectorAll('[href="#' + this.targetId + '"], [data-target="#' + this.targetId + '"]'));
		if (this.settings.focus) this.focusableChildren = this.getFocusableChildren();
		if (this.settings.trapTab) this.boundKeyListener = this.keyListener.bind(this);

		this.statusClass = !this.settings.local ? 'on--' + this.targetId : 'active';
		this.animatingClass = !this.settings.local ? 'animating--' + this.targetId : 'animating';

		this.siblingBtns.forEach(function (btn) {
			btn.setAttribute('role', 'button');
			btn.setAttribute('aria-controls', _this.targetId);
			btn.setAttribute('aria-expanded', 'false');
		});

		TRIGGER_EVENTS.forEach(function (ev) {
			_this.btn.addEventListener(ev, function (e) {
				if (!!e.keyCode && !~TRIGGER_KEYCODES.indexOf(e.keyCode)) return;
				_this.toggle(e);
			});
		});
		this.settings.startOpen && this.toggle();

		return this;
	},
	getFocusableChildren: function getFocusableChildren() {
		var focusableElements = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];

		return [].slice.call(this.targetElement.querySelectorAll(focusableElements.join(',')));
	},

	toggleAttributes: function toggleAttributes() {
		this.isOpen = !this.isOpen;
		this.siblingBtns.forEach(function (sibling) {
			sibling.setAttribute('aria-expanded', sibling.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
		});
	},
	toggleState: function toggleState() {
		this.classTarget.classList.remove(this.animatingClass);
		this.classTarget.classList.toggle(this.statusClass);
	},
	manageFocus: function manageFocus() {
		var _this2 = this;

		if (!this.isOpen) {
			this.lastFocused = document.activeElement;
			this.focusableChildren.length && window.setTimeout(function () {
				return _this2.focusableChildren[0].focus();
			}, this.settings.delay);
			this.settings.trapTab && document.addEventListener('keydown', this.boundKeyListener);
		} else {
			this.settings.trapTab && document.removeEventListener('keydown', this.boundKeyListener);
			this.focusableChildren.length && window.setTimeout(function () {
				_this2.lastFocused.focus();
				_this2.lastFocused = false;
			}, this.settings.delay);
		}
	},
	trapTab: function trapTab(e) {
		var focusedIndex = this.focusableChildren.indexOf(document.activeElement);
		if (e.shiftKey && focusedIndex === 0) {
			e.preventDefault();
			this.focusableChildren[this.focusableChildren.length - 1].focus();
		} else {
			if (!e.shiftKey && focusedIndex === this.focusableChildren.length - 1) {
				e.preventDefault();
				this.focusableChildren[0].focus();
			}
		}
	},
	keyListener: function keyListener(e) {
		if (this.isOpen && e.keyCode === 27) {
			e.preventDefault();
			this.toggle();
		}
		if (this.isOpen && e.keyCode === 9) this.trapTab(e);
	},

	toggle: function toggle(e) {
		var _this3 = this;

		var delay = this.classTarget.classList.contains(this.statusClass) ? this.settings.delay : 0;

		!!this.settings.prehook && typeof this.settings.prehook === 'function' && this.settings.prehook.call(this);

		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		this.classTarget.classList.add(this.animatingClass);

		window.setTimeout(function () {
			!!_this3.settings.focus && _this3.focusableChildren && _this3.manageFocus();
			_this3.toggleAttributes();
			_this3.toggleState();
			!!_this3.settings.callback && typeof _this3.settings.callback === 'function' && _this3.settings.callback.call(_this3);
		}, delay);
	}
};

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));

	if (!els.length) throw new Error('Toggler cannot be initialised, no augmentable elements found');

	return els.map(function (el) {
		return Object.assign(Object.create(componentPrototype), {
			btn: el,
			targetId: (el.getAttribute('href') || el.getAttribute('data-target')).substr(1),
			settings: Object.assign({}, defaults, el.dataset, opts)
		}).init();
	});
};

var index = { init: init };

exports.default = index;;
}));
