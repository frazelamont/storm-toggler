/**
 * @name storm-toggler: Accessible class-toggling for CSS-based UI state manipulation
 * @version 0.4.1: Sat, 27 Feb 2016 21:40:29 GMT
 * @author mjbp
 * @license MIT
 */module.exports = (function() {
	'use strict';
    
    var instances = [],
        defaults = {
            delay: 200,
            targetLocal: false,
            callback: null
        },
        assign = require('object-assign'),
        merge = require('merge'),
        classlist = require('dom-classlist'),
        attributelist = require('storm-attributelist'),
		StormToggler = {
			init: function() {
				this.targetElement = document.getElementById(this.targetId);
        		this.classTarget = (!this.settings.targetLocal) ? document.documentElement : this.targetElement.parentNode;
				if((!this.settings.targetLocal)) {
					this.statusClass = ['on--', this.targetId].join('');
					this.animatingClass = ['animating--', this.targetId].join('');
				} else {
					this.statusClass = 'active';
					this.animatingClass = 'animating';
				}
        
				attributelist.set(this.btn, {
					'role' : 'button',
					'aria-controls' : this.targetId,
					'aria-expanded' : 'false'
				});

				attributelist.set(this.targetElement, {
					'aria-hidden': true
				});

				this.btn.addEventListener('click', function(e) { this.toggle.call(this, e); }.bind(this), false);
			},
			toggle: function(e){
				var delay = classlist(this.classTarget).contains(this.statusClass) ?  this.settings.delay : 0;
				
				e.preventDefault();
        		e.stopPropagation();
				
				classlist(this.classTarget).add(this.animatingClass);
				
				window.setTimeout(function() {
					classlist(this.classTarget).remove(this.animatingClass);
					classlist(this.classTarget).toggle(this.statusClass);
					attributelist.toggle(this.btn, 'aria-expanded');
					attributelist.toggle(this.targetElement, 'aria-hidden');
					(!!this.settings.callback && typeof this.settings.callback === 'function') && this.settings.callback.call(this);
				}.bind(this), delay);
			}
		};
	
	function create(el, i, opts) {
		instances[i] = assign(Object.create(StormToggler), {
			btn: el,
			targetId: (el.getAttribute('href')|| el.getAttribute('data-target')).substr(1),
			settings: merge({}, defaults, opts)
		});
		instances[i].init();
	}
	
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        
        if(els.length === 0) {
            throw new Error('Toggler cannot be initialised, no augmentable elements found');
        }
		
		els.forEach(function(el, i) {
			create(el, i, opts);
		});
        return instances;
        
    }
    
    function reload(sel, opts) {
		[].slice.call(document.querySelectorAll(sel)).forEach(function(el, i){
			if(!instances.filter(function(instance){ return (instance.btn === el); }).length) {
				create(el, instances.length, opts);
			}
		});
    }
    
    function destroy() {
        instances = [];  
    }
	
	return {
		init: init,
		reload: reload,
		destroy: destroy
	};
	
 }());