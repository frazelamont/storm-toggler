(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _stormToggler = require('./libs/storm-toggler');

var _stormToggler2 = _interopRequireDefault(_stormToggler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onDOMContentLoadedTasks = [function () {
	_stormToggler2.default.init('.js-toggle');
	global.Togglers = _stormToggler2.default.init('.js-toggle-local', {
		targetLocal: true,
		delay: 0,
		callback: function callback() {
			var _this = this;

			if (this.open) {
				global.Togglers.forEach(function (toggler) {
					if (toggler !== _this && !!toggler.open) {
						toggler.toggle();
					}
				});
			}
		}
	});
}];

global.Togglers = {};

if ('addEventListener' in window) window.addEventListener('DOMContentLoaded', function () {
	onDOMContentLoadedTasks.forEach(function (fn) {
		return fn();
	});
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./libs/storm-toggler":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @name storm-toggler: Class and ARIA toggle UI state manipulation
 * @version 0.11.0: Fri, 11 Nov 2016 12:36:44 GMT
 * @author mjbp
 * @license MIT
 */
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
		this.siblingBtns = [].slice.call(document.querySelectorAll('[href*="#' + this.targetId + '"], [data-target*="#' + this.targetId + '"]'));

		this.statusClass = !this.settings.targetLocal ? 'on--' + this.targetId : 'active';
		this.animatingClass = !this.settings.targetLocal ? 'animating--' + this.targetId : 'animating';

		this.btn.setAttribute('role', 'button');
		this.btn.setAttribute('aria-controls', this.targetId);
		this.btn.setAttribute('aria-expanded', 'false');

		this.btn.addEventListener('click', function (e) {
			_this.toggle(e);
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

exports.default = { init: init };

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL3N0b3JtLXRvZ2dsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNBQTs7Ozs7O0FBRUEsSUFBTSwwQkFBMEIsQ0FBQyxZQUFNO0FBQ3RDLHdCQUFRLElBQVIsQ0FBYSxZQUFiO0FBQ0EsUUFBTyxRQUFQLEdBQWlCLHVCQUFRLElBQVIsQ0FBYSxrQkFBYixFQUFpQztBQUNqRCxlQUFhLElBRG9DO0FBRWpELFNBQU8sQ0FGMEM7QUFHakQsWUFBVSxvQkFBVztBQUFBOztBQUNwQixPQUFHLEtBQUssSUFBUixFQUFhO0FBQ1osV0FBTyxRQUFQLENBQWdCLE9BQWhCLENBQXdCLG1CQUFXO0FBQ2xDLFNBQUcscUJBQW9CLENBQUMsQ0FBQyxRQUFRLElBQWpDLEVBQXNDO0FBQ3JDLGNBQVEsTUFBUjtBQUNBO0FBQ0QsS0FKRDtBQUtBO0FBQ0Q7QUFYZ0QsRUFBakMsQ0FBakI7QUFhQSxDQWYrQixDQUFoQzs7QUFpQkEsT0FBTyxRQUFQLEdBQWtCLEVBQWxCOztBQUVBLElBQUcsc0JBQXNCLE1BQXpCLEVBQWlDLE9BQU8sZ0JBQVAsQ0FBd0Isa0JBQXhCLEVBQTRDLFlBQU07QUFBRSx5QkFBd0IsT0FBeEIsQ0FBZ0MsVUFBQyxFQUFEO0FBQUEsU0FBUSxJQUFSO0FBQUEsRUFBaEM7QUFBZ0QsQ0FBcEc7Ozs7Ozs7Ozs7QUNyQmpDOzs7Ozs7QUFNQSxJQUFNLFdBQVc7QUFDaEIsUUFBTyxHQURTO0FBRWhCLGNBQWEsS0FGRztBQUdoQixXQUFVO0FBSE0sQ0FBakI7O0FBTUEsSUFBTSxlQUFlO0FBQ3BCLEtBRG9CLGtCQUNiO0FBQUE7O0FBQ04sT0FBSyxhQUFMLEdBQXFCLFNBQVMsY0FBVCxDQUF3QixLQUFLLFFBQTdCLENBQXJCO0FBQ0EsT0FBSyxXQUFMLEdBQW9CLENBQUMsS0FBSyxRQUFMLENBQWMs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QWtFLENBQWxFLENBRnVDO0FBR2pELGFBQVUsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFrQixRQUFsQixFQUE0QixJQUE1QjtBQUh1QyxHQUEzQyxFQUlKLElBSkksRUFBUDtBQUtBLEVBTk0sQ0FBUDtBQU9BLENBWkQ7O2tCQWNlLEVBQUUsVUFBRixFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBUb2dnbGVyIGZyb20gJy4vbGlicy9zdG9ybS10b2dnbGVyJztcblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkVGFza3MgPSBbKCkgPT4ge1xuXHRUb2dnbGVyLmluaXQoJy5qcy10b2dnbGUnKTtcblx0Z2xvYmFsLlRvZ2dsZXJzID1Ub2dnbGVyLmluaXQoJy5qcy10b2dnbGUtbG9jYWwnLCB7XG5cdFx0dGFyZ2V0TG9jYWw6IHRydWUsXG5cdFx0ZGVsYXk6IDAsXG5cdFx0Y2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYodGhpcy5vcGVuKXtcblx0XHRcdFx0Z2xvYmFsLlRvZ2dsZXJzLmZvckVhY2godG9nZ2xlciA9PiB7XG5cdFx0XHRcdFx0aWYodG9nZ2xlciAhPT0gdGhpcyAmJiAhIXRvZ2dsZXIub3Blbil7XG5cdFx0XHRcdFx0XHR0b2dnbGVyLnRvZ2dsZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1dO1xuXG5nbG9iYWwuVG9nZ2xlcnMgPSB7fTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0pO1xuIiwiLyoqXG4gKiBAbmFtZSBzdG9ybS10b2dnbGVyOiBDbGFzcyBhbmQgQVJJQSB0b2dnbGUgVUkgc3RhdGUgbWFuaXB1bGF0aW9uXG4gKiBAdmVyc2lvbiAwLjExLjA6IEZyaSwgMTEgTm92IDIwMTYgMTI6MzY6NDQgR01UXG4gKiBAYXV0aG9yIG1qYnBcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5jb25zdCBkZWZhdWx0cyA9IHtcblx0ZGVsYXk6IDIwMCxcblx0dGFyZ2V0TG9jYWw6IGZhbHNlLFxuXHRjYWxsYmFjazogbnVsbFxufTtcblxuY29uc3QgU3Rvcm1Ub2dnbGVyID0ge1xuXHRpbml0KCkge1xuXHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudGFyZ2V0SWQpO1xuXHRcdHRoaXMuY2xhc3NUYXJnZXQgPSAoIXRoaXMuc2V0dGluZ3MudGFyZ2V0TG9jYWwpID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogdGhpcy50YXJnZXRFbGVtZW50LnBhcmVudE5vZGU7XG5cdFx0dGhpcy5zaWJsaW5nQnRucyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2hyZWYqPVwiIycgKyB0aGlzLnRhcmdldElkICsgJ1wiXSwgW2RhdGEtdGFyZ2V0Kj1cIiMnICsgdGhpcy50YXJnZXRJZCArICdcIl0nKSk7XG5cblx0XHR0aGlzLnN0YXR1c0NsYXNzID0gIXRoaXMuc2V0dGluZ3MudGFyZ2V0TG9jYWwgPyBgb24tLSR7dGhpcy50YXJnZXRJZH1gIDogJ2FjdGl2ZSc7XG5cdFx0dGhpcy5hbmltYXRpbmdDbGFzcyA9ICF0aGlzLnNldHRpbmdzLnRhcmdldExvY2FsID8gYGFuaW1hdGluZy0tJHt0aGlzLnRhcmdldElkfWAgOiAnYW5pbWF0aW5nJztcblxuXHRcdHRoaXMuYnRuLnNldEF0dHJpYnV0ZSgncm9sZScsJ2J1dHRvbicpO1xuXHRcdHRoaXMuYnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRoaXMudGFyZ2V0SWQpO1xuXHRcdHRoaXMuYnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG5cdFx0dGhpcy5idG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHsgdGhpcy50b2dnbGUoZSk7IH0pO1xuXHRcdFxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXHR0b2dnbGVBdHRyaWJ1dGVzOiBmdW5jdGlvbigpe1xuXHRcdHRoaXMub3BlbiA9ICF0aGlzLm9wZW47XG5cdFx0dGhpcy5zaWJsaW5nQnRucy5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuXHRcdFx0c2libGluZy5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAhc2libGluZy5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSk7XG5cdFx0fSk7XG5cdH0sXG5cdHRvZ2dsZURvY3VtZW50U3RhdGU6IGZ1bmN0aW9uKCl7XG5cdFx0dGhpcy5jbGFzc1RhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuYW5pbWF0aW5nQ2xhc3MpO1xuXHRcdHRoaXMuY2xhc3NUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLnN0YXR1c0NsYXNzKTtcblx0fSxcblx0dG9nZ2xlOiBmdW5jdGlvbihlKXtcblx0XHR2YXIgZGVsYXkgPSB0aGlzLmNsYXNzVGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLnN0YXR1c0NsYXNzKSA/ICB0aGlzLnNldHRpbmdzLmRlbGF5IDogMDtcblx0XHRcblx0XHRpZihlKXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHRcdFxuXHRcdHRoaXMuY2xhc3NUYXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmFuaW1hdGluZ0NsYXNzKTtcblx0XHRcblx0XHR3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLnRvZ2dsZUF0dHJpYnV0ZXMoKTtcblx0XHRcdHRoaXMudG9nZ2xlRG9jdW1lbnRTdGF0ZSgpO1xuXHRcdFx0KCEhdGhpcy5zZXR0aW5ncy5jYWxsYmFjayAmJiB0eXBlb2YgdGhpcy5zZXR0aW5ncy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgJiYgdGhpcy5zZXR0aW5ncy5jYWxsYmFjay5jYWxsKHRoaXMpO1xuXHRcdH0sIGRlbGF5KTtcblx0fVxufTtcblxuY29uc3QgaW5pdCA9IChzZWwsIG9wdHMpID0+IHtcblx0bGV0IGVscyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpKTtcblx0XG5cdGlmKCFlbHMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoJ1RvZ2dsZXIgY2Fubm90IGJlIGluaXRpYWxpc2VkLCBubyBhdWdtZW50YWJsZSBlbGVtZW50cyBmb3VuZCcpO1xuXG5cdHJldHVybiBlbHMubWFwKChlbCkgPT4ge1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoU3Rvcm1Ub2dnbGVyKSwge1xuXHRcdFx0YnRuOiBlbCxcblx0XHRcdHRhcmdldElkOiAoZWwuZ2V0QXR0cmlidXRlKCdocmVmJyl8fCBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykpLnN1YnN0cigxKSxcblx0XHRcdHNldHRpbmdzOiBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cylcblx0XHR9KS5pbml0KCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07Il19
